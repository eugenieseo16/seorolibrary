package com.seoro.seoro.controller;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.User;
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
		log.info("email: " + requestDto.getMemberEmail());
		log.info("name: " + requestDto.getMemberName());
		log.info("password: " + requestDto.getMemberPassword());
		log.info("dupchkPassword: " + requestDto.getDupchkPassword());

		// 이메일 인증 추가

		// 유효값 검사
		ResultResponseDto responseDto = new ResultResponseDto();
		Map<String, String> errorMap = new HashMap<>();
		if(bindingResult.hasErrors()) {
			for(FieldError error : bindingResult.getFieldErrors()) {
				errorMap.put("valid+" + error.getField(), error.getDefaultMessage());
				log.info("error message : "+error.getDefaultMessage());
			}
		}

		// 중복 검사
		if(memberService.checkEmailDuplication(requestDto.getMemberEmail())) {
			errorMap.put("valid+memberEmail", "이미 존재하는 이메일입니다.");
		}

		if(memberService.chechNameDuplication(requestDto.getMemberName())) {
			errorMap.put("valid+memberName", "이미 존재하는 닉네임입니다.");
		}

		if(memberService.checkPasswordDuplication(requestDto.getMemberPassword(), requestDto.getDupchkPassword())) {
			errorMap.put("valid+dupchkPassword", "비밀번호가 일치하지 않습니다.");
		}

		if(0 < errorMap.size()) {
			responseDto.setErrorMap(errorMap);
			responseDto.setResult(false);

			return responseDto;
		}

		return memberService.signupMember(requestDto);
	}

	@PostMapping("/login")
	public TokenDto login(@RequestBody LoginDto requestDto) {
		return memberService.login(requestDto);
	}

	@PostMapping("")
	private MemberDto viewMemberInfo(@RequestHeader("Authorization") String accessToken) {
		log.info("Authorization: " + accessToken);
		// String payloadJWT = accessToken.split("\\.")[1];
		String username = jwtTokenUtil.getUsername(resolveToken(accessToken));
		// Base64.Decoder decoder = Base64.getUrlDecoder();
		// String username = new String(decoder.decode(payloadJWT));
		log.info("userName: " + username);
		return memberService.viewMemberInfo(username);
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
