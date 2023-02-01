package com.seoro.seoro.controller;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoro.seoro.domain.dto.Group.GroupSignupRequestDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.service.Group.GroupService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/groups")
public class GroupController {
	private final GroupService groupService;

	@PostMapping("/signup")
	public ResultResponseDto makeGroup(@ModelAttribute GroupSignupRequestDto requestDto) {
		System.out.println("나와봐");
		return groupService.makeGroup(requestDto);
	}
}
