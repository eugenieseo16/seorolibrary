package com.seoro.seoro.controller;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoro.seoro.domain.dto.Member.LoginDto;
import com.seoro.seoro.domain.dto.Member.MemberDto;
import com.seoro.seoro.domain.dto.Member.MemberPasswordDto;
import com.seoro.seoro.domain.dto.Member.MemberSignupDto;
import com.seoro.seoro.domain.dto.Member.MemberUpdateDto;
import com.seoro.seoro.domain.dto.Member.TokenDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.service.Member.MemberService;
import com.seoro.seoro.util.JwtTokenUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
@Slf4j
public class MemberController {
	private final MemberService memberService;
	private final JwtTokenUtil jwtTokenUtil;

	@PostMapping("/signup")
	public ResultResponseDto signupMember(@RequestBody @Valid MemberSignupDto requestDto, BindingResult bindingResult) {
		// 취향 선택
		// 화면에 맞춰 수정
		// Long genre = 0L;
		// Long[] selectGenre = new Long[20];
		// for(int i=0; i<20; i++) {
		// 	genre = genre & selectGenre[i];
		// }
		// requestDto.setMemberGenre(genre);

		// 이메일 인증 추가

		// 에러 메세지
		if(bindingResult.hasErrors()) {
			Map<String, String> errorMap = new HashMap<>();
			for(FieldError error : bindingResult.getFieldErrors()) {
				errorMap.put("valid+" + error.getField(), error.getDefaultMessage());
				log.info("error message : "+error.getDefaultMessage());
			}

			ResultResponseDto responseDto = new ResultResponseDto();
			responseDto.setResult(false);
			responseDto.setErrorMap(errorMap);

			return responseDto;
		}

		return memberService.signupMember(requestDto);
	}

	@PostMapping("/login")
	public TokenDto login(@RequestBody LoginDto requestDto) {
		return memberService.login(requestDto);
	}

	@PostMapping("/reissue")
	public TokenDto reissue(@RequestHeader("RefreshToken") String refreshToken) {
		return memberService.reissue(refreshToken);
	}

	@PostMapping("/logout")
	public void logout(@RequestHeader("Authorization") String accessToken, @RequestHeader("RefreshToken") String refreshToken) {
		String username = jwtTokenUtil.getUsername(resolveToken(accessToken));
		memberService.logout(TokenDto.of(accessToken, refreshToken), username);
	}

	@GetMapping("/memberName/dupchk/{memberName}")
	public ResultResponseDto checkNameDuplicate(@PathVariable String memberName) {
		// 중복이면 true
		return memberService.chechNameDuplication(memberName);
	}

	@GetMapping("/memberEmail/dupchk/{memberEmail}")
	public ResultResponseDto checkEmailDuplicate(@PathVariable String memberEmail) {
		// 중복이면 true
		return memberService.checkEmailDuplication(memberEmail);
	}

	@GetMapping("/{memberName}")
	public MemberDto viewMember(@PathVariable String memberName) {
		return memberService.viewMember(memberName);
	}

	@PutMapping("/{memberName}")
	public MemberDto modifyProfile(@RequestBody MemberUpdateDto requestDto, @PathVariable String memberName) {
		System.out.println("memberName: " + memberName);
		// email 같은 값은 그대로 가는 처리 프론트와 연동
		return memberService.modifyProfile(requestDto, memberName);
	}

	@PutMapping("/{memberName}/password")
	public ResultResponseDto modifyPassword(@RequestBody MemberPasswordDto requestDto, @PathVariable String memberName) {
		return memberService.modifyPassword(requestDto, memberName);
	}

	@DeleteMapping("{memberName}")
	public ResultResponseDto removeMember(@PathVariable String memberName) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();
		// 이메일 재입력 주석 처리
		// MemberDto memberDto = memberService.viewMember(memberName);
		// if(memberDto.getResult() && memberDto.getMemberName().equals(memberEmail)) {
		// 	if(memberService.removeMember(memberName).getResult()) {
		// 		resultResponseDto.setResult(true);
		// 	} else {
		// 		resultResponseDto.setResult(false);
		// 	}
		// } else {
		// 	resultResponseDto.setResult(false);
		// }
		return memberService.removeMember(memberName);
	}

	private String resolveToken(String accessToken) {
		return accessToken.substring(7);
	}
}
