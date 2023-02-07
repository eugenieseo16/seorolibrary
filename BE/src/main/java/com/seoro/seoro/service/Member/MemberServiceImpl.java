package com.seoro.seoro.service.Member;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Member.MemberDto;
import com.seoro.seoro.domain.dto.Member.MemberSignupDto;
import com.seoro.seoro.domain.dto.Member.MemberUpdateDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.domain.entity.Member.Member;
import com.seoro.seoro.repository.Member.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;

	@Override
	public ResultResponseDto signupMember(MemberSignupDto requestDto) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();

		if(memberRepository.findByMemberEmail(requestDto.getMemberEmail()).isPresent()) {
			new RuntimeException("이미 가업된 이메일입니다.");
		}
		if(!requestDto.getMemberPassword().equals(requestDto.getDupchkPassword())) {
			new RuntimeException("비밀번호가 일치하지 않습니다.");
		}

		Member member = Member.builder()
			.memberEmail(requestDto.getMemberEmail())
			.memberName(requestDto.getMemberName())
			.memberPassword(passwordEncoder.encode(requestDto.getMemberPassword()))
			.loginType(requestDto.getLoginType())
			.build();

		memberRepository.save(member);
		resultResponseDto.setResult(true);

		return resultResponseDto;
	}

	@Override
	public ResultResponseDto chechNameDuplication(String memberName) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();
		boolean nameDuplicate = memberRepository.existsByMemberName(memberName);

		resultResponseDto.setResult(nameDuplicate);

		return resultResponseDto;
	}

	@Override
	public ResultResponseDto checkEmailDuplication(String memberEmail) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();
		boolean emailDuplicate = memberRepository.existsByMemberEmail(memberEmail);

		resultResponseDto.setResult(emailDuplicate);

		return resultResponseDto;
	}

	@Override
	public List<MemberDto> findByMemberNameLike(String input) {
		List<Member> list = memberRepository.findByMemberNameLike(input);
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

		Member viewMember =  memberRepository.findByMemberName(memberName);
		if(viewMember != null) {
			responseDto = new MemberDto(member);
			responseDto.setResult(true);
		} else {
			responseDto.setResult(false);
			return responseDto;
		}

		return responseDto;
	}

	@Override
	public MemberDto modifyProfile(MemberUpdateDto requestDto, String memberName) {
		Member member = memberRepository.findByMemberName(memberName);
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
	public ResultResponseDto removeMember(String memberName) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();

		memberRepository.deleteByMemberName(memberName);
		resultResponseDto.setResult(true);

		return resultResponseDto;
	}
}
