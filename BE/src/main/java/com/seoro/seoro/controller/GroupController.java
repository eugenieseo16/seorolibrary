package com.seoro.seoro.controller;

import com.seoro.seoro.domain.dto.Group.GroupDetailResponseDto;
import org.springframework.web.bind.annotation.*;

import com.seoro.seoro.domain.dto.Group.GroupMainResponseDto;
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

	@GetMapping("/{username}")
	public GroupMainResponseDto groupMain(@PathVariable("username") String userName) {
		return groupService.groupMain(userName);
	}

	@PostMapping("/signup")
	public ResultResponseDto makeGroup(@ModelAttribute GroupSignupRequestDto requestDto) {
		return groupService.makeGroup(requestDto);
	}

	@GetMapping("/detail/{groupid}")
	public GroupDetailResponseDto groupDetail(@PathVariable("groupid") Long groupId) {
		return groupService.groupDetail(groupId);
	}
}
