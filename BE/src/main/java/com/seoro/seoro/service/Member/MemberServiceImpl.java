package com.seoro.seoro.service.Member;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.seoro.seoro.auth.CacheKey;
import com.seoro.seoro.auth.CustomUserDetailService;
import com.seoro.seoro.auth.JwtExpirationEnums;
import com.seoro.seoro.auth.LogoutAcessToken;
import com.seoro.seoro.auth.RefreshToken;
import com.seoro.seoro.auth.RefreshTokenRedisRepository;
import com.seoro.seoro.domain.dto.Member.LoginDto;
import com.seoro.seoro.domain.dto.Member.MemberDto;
import com.seoro.seoro.domain.dto.Member.MemberPasswordDto;
import com.seoro.seoro.domain.dto.Member.MemberSignupDto;
import com.seoro.seoro.domain.dto.Member.MemberUpdateDto;
import com.seoro.seoro.domain.dto.Member.TokenDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
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
	private final CustomUserDetailService customUserDetailService;

	@Override
	public ResultResponseDto signupMember(MemberSignupDto requestDto) {
		ResultResponseDto responseDto = new ResultResponseDto();
		Member member = new Member();

		if(memberRepository.findByMemberEmail(requestDto.getMemberEmail()).isPresent()) {
			new RuntimeException("이미 가업된 이메일입니다.");
			responseDto.setResult(false);
			return responseDto;
		}
		// 비밀번호 재확인 주석 처리
		// String password = requestDto.getMemberPassword();
		// String checkPassword = requestDto.getDupchkPassword();
		// log.info("password: " + password + " dupchk: " + checkPassword);
		// if(!password.equals(checkPassword)) {
		// 	log.info("비밀번호 불일치");
		// 	new RuntimeException("비밀번호가 일치하지 않습니다.");
		// 	responseDto.setResult(false);
		// 	return responseDto;
		// }

		member = Member.builder()
			.memberEmail(requestDto.getMemberEmail())
			.memberName(requestDto.getMemberName())
			.memberPassword(passwordEncoder.encode(requestDto.getMemberPassword()))
			.memberGenre(requestDto.getMemberGenre())
			.build();

		memberRepository.save(member);
		responseDto.setResult(true);

		return responseDto;
	}

	@Override
	public ResultResponseDto chechNameDuplication(String memberName) {
		ResultResponseDto responseDto = new ResultResponseDto();
		boolean nameDuplicate = memberRepository.existsByMemberName(memberName);

		responseDto.setResult(nameDuplicate);

		return responseDto;
	}

	@Override
	public ResultResponseDto checkEmailDuplication(String memberEmail) {
		ResultResponseDto responseDto = new ResultResponseDto();
		boolean emailDuplicate = memberRepository.existsByMemberEmail(memberEmail);

		responseDto.setResult(emailDuplicate);

		return responseDto;
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

		Member viewMember =  memberRepository.findByMemberName(memberName).orElseThrow(() -> new NoSuchElementException("회원이 없습니다"));
		if(viewMember != null) {
			responseDto = new MemberDto(viewMember);
			responseDto.setResult(true);
		} else {
			responseDto.setResult(false);
			return responseDto;
		}

		return responseDto;
	}

	@Override
	public MemberDto modifyProfile(MemberUpdateDto requestDto, String memberName) {
		Member member = memberRepository.findByMemberName(memberName).get();
		MemberDto responseDto = new MemberDto(member);

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
				.memberGenre(requestDto.getMemberGenre()) // 수정
				.build();

			memberRepository.save(newMember);
			responseDto.setResult(true);
		} else {
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
				log.info("새 비밀번호가 일치하지 않습니다.");
				responseDto.setResult(false);
				return responseDto;
			}
		} else {
			log.info("현재 비밀번호와 일치하지 않습니다.");
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
		}

		return responseDto;
	}

	@Override
	public TokenDto login(LoginDto requestDto) {
		log.info("email " + requestDto.getEmail());
		log.info("password " + requestDto.getPassword());
		Member member = memberRepository.findByMemberEmail(requestDto.getEmail()).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
		checkPassword(requestDto.getPassword(), member.getMemberPassword());

		// String username = member.getMemberEmail();
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

	private void checkPassword(String rawPassword, String findMemberPassword) {
		if(!passwordEncoder.matches(rawPassword, findMemberPassword)) {
			throw new IllegalArgumentException("비밀번호가 맞지 않습니다.");
		}
	}

	private RefreshToken saveRefreshToken(String username) {
		return refreshTokenRedisRepository.save(RefreshToken.createRefreshToken(username,
			jwtTokenUtil.generateRefreshToken(username), REFRESH_TOKEN_EXPIRATION_TIME.getValue()));
	}

	private String resolveToken(String token) {
		return token.substring(7);
	}

	public TokenDto reissue(String refreshToken) {
		log.info("refreshToken: " + refreshToken);
		refreshToken = resolveToken(refreshToken);
		log.info("refreshToken: " + refreshToken);
		String username = getCurrentUsername();
		log.info("username: " + username);
		RefreshToken redisRefreshToken = refreshTokenRedisRepository.findById(username).orElseThrow(NoSuchElementException::new);

		if(refreshToken.equals(redisRefreshToken.getRefreshToken())) {
			return reissueRefreshToken(refreshToken, username);
		}
		throw new IllegalArgumentException("토큰이 일치하지 않습니다");
	}

	// 하는 중
	@Override
	public MemberDto viewMemberInfo(String username) {
		Member member = memberRepository.findByMemberEmail(username).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));
		MemberDto memberDto = new MemberDto(member);

		return memberDto;
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
