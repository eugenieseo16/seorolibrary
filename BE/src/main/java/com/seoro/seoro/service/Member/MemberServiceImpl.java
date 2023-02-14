package com.seoro.seoro.service.Member;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.seoro.seoro.auth.CacheKey;
import com.seoro.seoro.auth.CustomUserDetailService;
import com.seoro.seoro.auth.JwtExpirationEnums;
import com.seoro.seoro.auth.LogoutAcessToken;
import com.seoro.seoro.auth.RefreshToken;
import com.seoro.seoro.auth.RefreshTokenRedisRepository;
import com.seoro.seoro.domain.dto.GenreResponseDto;
import com.seoro.seoro.domain.dto.Member.LoginDto;
import com.seoro.seoro.domain.dto.Member.MemberDto;
import com.seoro.seoro.domain.dto.Member.MemberPasswordDto;
import com.seoro.seoro.domain.dto.Member.MemberSignupDto;
import com.seoro.seoro.domain.dto.Member.MemberUpdateDto;
import com.seoro.seoro.domain.dto.Member.TokenDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.domain.entity.Member.LoginType;
import com.seoro.seoro.domain.entity.Genre;
import com.seoro.seoro.domain.entity.Member.Member;
import com.seoro.seoro.auth.LogoutAccessTokenRedisRepositoty;
import com.seoro.seoro.repository.Member.MemberRepository;
import com.seoro.seoro.util.JwtTokenUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import static com.seoro.seoro.auth.JwtExpirationEnums.REFRESH_TOKEN_EXPIRATION_TIME;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	private final RefreshTokenRedisRepository refreshTokenRedisRepository;
	private final LogoutAccessTokenRedisRepositoty logoutAccessTokenRedisRepositoty;
	private final JwtTokenUtil jwtTokenUtil;

	@Override
	public ResultResponseDto signupMember(MemberSignupDto requestDto) {
		ResultResponseDto responseDto = new ResultResponseDto();

		Member member = Member.builder()
			.memberEmail(requestDto.getMemberEmail())
			.memberName(requestDto.getMemberName())
			.memberPassword(passwordEncoder.encode(requestDto.getMemberPassword()))
			.memberGenre(65535L)
			.loginType(LoginType.BASIC)
			.memberDongCode("0")
			.build();

		memberRepository.save(member);
		responseDto.setResult(true);

		return responseDto;
	}

	@Override
	public boolean chechNameDuplication(String memberName) {
		return memberRepository.existsByMemberName(memberName);
	}

	@Override
	public boolean checkEmailDuplication(String memberEmail) {
		return memberRepository.existsByMemberEmail(memberEmail);
	}

	@Override
	public boolean checkPasswordDuplication(String password, String dupchkPassword) {
		log.info("password: " + password + " dupchk: " + dupchkPassword);
		if(!password.equals(dupchkPassword)) {
			log.info("비밀번호 불일치");
			return true;
		}
		return false;
	}

	@Override
	public List<MemberDto> findByMemberNameLike(String input) {
		List<Member> list = memberRepository.findByMemberNameLike(input);
		System.out.println(list.size());
		List<MemberDto> dtoList = new ArrayList<>();
		for(Member member : list){
			dtoList.add(MemberDto.builder()
				.memberProfile(member.getMemberProfile())
				.memberEmail(member.getMemberEmail())
				.memberScore(member.getMemberScore())
				.memberDongCode(member.getMemberDongCode())
				.memberName(member.getMemberName())
				.build());
		}
		return dtoList;
	}

	@Override
	public MemberDto viewMember(String memberName) {
		Member member = new Member();
		MemberDto responseDto = new MemberDto();

		Member viewMember =  memberRepository.findByMemberName(memberName).orElse(null);
		if(viewMember != null) {
			responseDto = new MemberDto(viewMember);
			responseDto.setResult(true);
		} else {
			responseDto.setMessege("회원 정보가 없습니다");
			responseDto.setResult(false);
			return responseDto;
		}

		return responseDto;
	}

	@Override
	public MemberDto modifyProfile(MemberUpdateDto requestDto, String memberName) {
		Member member = memberRepository.findByMemberName(memberName).orElse(null);
		MemberDto responseDto = new MemberDto(member);

		Long genre = 0L;
		if(requestDto.getMemberGenre().length > 0) {
			for(int i=0; i<requestDto.getMemberGenre().length; i++) {
				genre = genre | (1 << requestDto.getMemberGenre()[i]);
			}
			log.info("장르 = {}", genre);
		}

		if(member != null) {
			Member newMember = Member.builder()
				.memberId(member.getMemberId())
				.memberEmail(member.getMemberEmail())
				.memberName(requestDto.getMemberName()) // 수정
				.memberPassword(member.getMemberPassword())
				.memberProfile(requestDto.getMemberProfile()) // 수정
				.memberDongCode(requestDto.getMemberDongCode()) // 수정
				.loginType(member.getLoginType())
				.withdrawalDate(member.getWithdrawalDate())
				.memberScore(member.getMemberScore())
				.memberGenre(genre) // 수정
				.build();

			memberRepository.save(newMember);
			responseDto.setResult(true);
		} else {
			responseDto.setMessege("회원 정보가 없습니다.");
			responseDto.setResult(false);
			return responseDto;
		}

		return responseDto;
	}

	@Override
	public ResultResponseDto modifyPassword(MemberPasswordDto requestDto, String memberName) {
		log.info("비밀번호 변경");
		ResultResponseDto responseDto = new ResultResponseDto();
		Member member = memberRepository.findByMemberName(memberName).get();

		if(!passwordEncoder.encode(requestDto.getMemberPassword()).equals(member.getMemberPassword())) {
			if(requestDto.getNewPassword().equals(requestDto.getCheckPassword())) {
				Member newMember = Member.builder()
					.memberId(member.getMemberId())
					.memberEmail(member.getMemberEmail())
					.memberName(member.getMemberName())
					.memberPassword(passwordEncoder.encode(requestDto.getNewPassword())) // 수정
					.memberProfile(member.getMemberProfile())
					.memberDongCode(member.getMemberDongCode())
					.loginType(member.getLoginType())
					.withdrawalDate(member.getWithdrawalDate())
					.memberScore(member.getMemberScore())
					.memberGenre(member.getMemberGenre())
					.build();

				memberRepository.save(newMember);
				responseDto.setResult(true);
			} else {
				responseDto.setMessege("새 비밀번호가 일치하지 않습니다.");
				responseDto.setResult(false);
				return responseDto;
			}
		} else {
			responseDto.setMessege("현재 비밀번호와 일치하지 않습니다.");
			responseDto.setResult(false);
			return responseDto;
		}

		return responseDto;
	}

	@Override
	public ResultResponseDto removeMember(String memberName) {
		ResultResponseDto responseDto = new ResultResponseDto();
		Member member = memberRepository.findByMemberName(memberName).get();

		if(member != null) {
			memberRepository.delete(member);
			responseDto.setResult(true);
		} else {
			responseDto.setMessege("회원 정보가 없습니다.");
			responseDto.setResult(false);
			return responseDto;
		}

		return responseDto;
	}

	@Override
	public TokenDto login(LoginDto requestDto) {
		log.info("email " + requestDto.getEmail());
		log.info("password " + requestDto.getPassword());

		Member member = memberRepository.findByMemberEmail(requestDto.getEmail()).orElse(null);
		if(member == null) {
			TokenDto tokenDto = new TokenDto();
			tokenDto.setMessege("이메일 정보가 없습니다.");
			return tokenDto;
		}

		// 비밀번호 불일치 핸들러
		if(!passwordEncoder.matches(requestDto.getPassword(), member.getMemberPassword())) {
			TokenDto tokenDto = new TokenDto();
			tokenDto.setMessege("비밀번호가 일치하지 않습니다.");
			return tokenDto;
		}

		String accessToken = jwtTokenUtil.generateAccessToken(requestDto.getEmail());
		RefreshToken refreshToken = saveRefreshToken(requestDto.getEmail());

		return TokenDto.of(accessToken, refreshToken.getRefreshToken());
	}

	@CacheEvict(value = CacheKey.USER, key = "#username")
	public void logout(TokenDto tokenDto, String username) {
		String accessToken = resolveToken(tokenDto.getAccessToken());
		long remainMilliSeconds = jwtTokenUtil.getRemainMilliSeconds(accessToken);
		refreshTokenRedisRepository.deleteById(username);
		logoutAccessTokenRedisRepositoty.save(LogoutAcessToken.of(accessToken, username, remainMilliSeconds));
	}

	private RefreshToken saveRefreshToken(String username) {
		return refreshTokenRedisRepository.save(RefreshToken.createRefreshToken(username,
			jwtTokenUtil.generateRefreshToken(username), REFRESH_TOKEN_EXPIRATION_TIME.getValue()));
	}

	private String resolveToken(String token) {
		return token.substring(7);
	}

	public TokenDto reissue(String refreshToken) {
		refreshToken = resolveToken(refreshToken);
		String username = getCurrentUsername();
		RefreshToken redisRefreshToken = refreshTokenRedisRepository.findById(username).orElseThrow(NoSuchElementException::new);

		if(refreshToken.equals(redisRefreshToken.getRefreshToken())) {
			return reissueRefreshToken(refreshToken, username);
		} else {
			TokenDto tokenDto = new TokenDto();
			tokenDto.setMessege("토큰이 일치하지 않습니다.");
			return tokenDto;
		}
	}

	@Override
	public MemberDto viewMemberInfo(String username) {
		Member member = memberRepository.findByMemberEmail(username).orElse(null);

		MemberDto memberDto;
		if(member == null) {
			memberDto = new MemberDto();
			memberDto.setMessege("회원이 없습니다.");
			return memberDto;
		}
		memberDto = new MemberDto(member);

		return memberDto;
	}

	@Override
	public GenreResponseDto getGenres(int[] genres) {
		GenreResponseDto responseDto = new GenreResponseDto();
		String[] resGenre = new String[genres.length];
		for(int i=0; i<genres.length; i++) {
			resGenre[i] = Genre.values()[genres[i]].getSymbol();
		}
		for(int i=0; i<resGenre.length; i++) {
			System.out.println("resGenre = " + resGenre[i]);
		}

		responseDto.setResult(true);
		responseDto.setGenres(resGenre);
		return responseDto;
	}

	private String getCurrentUsername() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		// UserDetails principal = (UserDetails) authentication.getPrincipal();
		String username = authentication.getName();
		return username;
	}

	private TokenDto reissueRefreshToken(String refreshToken, String username) {
		if(lessThanReissueExpirationTimesLeft(refreshToken)) {
			String accessToken = jwtTokenUtil.generateAccessToken(username);
			return TokenDto.of(accessToken, saveRefreshToken(username).getRefreshToken());
		}

		return TokenDto.of(jwtTokenUtil.generateAccessToken(username), refreshToken);
	}

	private boolean lessThanReissueExpirationTimesLeft(String refreshToken) {
		return jwtTokenUtil.getRemainMilliSeconds(refreshToken) < JwtExpirationEnums.REISSUE_EXPIRATION_TIME.getValue();
	}
}