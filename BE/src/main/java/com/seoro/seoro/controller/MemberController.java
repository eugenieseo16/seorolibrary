package com.seoro.seoro.controller;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoro.seoro.domain.dto.Member.MemberDto;
import com.seoro.seoro.domain.dto.Member.MemberSignupDto;
import com.seoro.seoro.domain.dto.Member.MemberUpdateDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.service.Member.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
	private final MemberService memberService;

	@PostMapping("/signup")
	public ResultResponseDto signupMember(@ModelAttribute @Valid MemberSignupDto requestDto, BindingResult bindingResult) {

		// 취향 카테고리 선택 작업 필요

		if(bindingResult.hasErrors()) {
			Map<String, String> errorMap = new HashMap<>();
			for(FieldError error : bindingResult.getFieldErrors()) {
				errorMap.put("valid+" + error.getField(), error.getDefaultMessage());
				// log.info("error message : "+error.getDefaultMessage());
			}

			ResultResponseDto responseDto = new ResultResponseDto();
			responseDto.setResult(false);
			return responseDto;
		}

		return memberService.signupMember(requestDto);
	}

	// 닉네임 중복

	// 이메일 중복

	@GetMapping("/{memberName}")
	public MemberDto viewMember(@PathVariable String memberName) {
		return memberService.viewMember(memberName);
	}

	@PutMapping("/{memberName}")
	public MemberDto modifyProfile(@ModelAttribute MemberUpdateDto requestDto, @PathVariable String memberName) {
		System.out.println("memberName: " + memberName);
		return memberService.modifyProfile(requestDto, memberName);
	}

	// 비밀번호 변경

	@DeleteMapping("{memberName}")
	public ResultResponseDto removeMember(@PathVariable String memberName, String memberEmail) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();
		MemberDto memberDto = memberService.viewMember(memberName);
		if(memberDto.getResult() && memberDto.getMemberName().equals(memberEmail)) {
			if(memberService.removeMember(memberName).getResult()) {
				resultResponseDto.setResult(true);
			} else {
				resultResponseDto.setResult(false);
			}
		} else {
			resultResponseDto.setResult(false);
		}
		return resultResponseDto;
	}
}
