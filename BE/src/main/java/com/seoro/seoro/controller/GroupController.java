package com.seoro.seoro.controller;

import com.seoro.seoro.domain.dto.Group.*;
import org.springframework.web.bind.annotation.*;

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

	@DeleteMapping("/{groupid}")
	public ResultResponseDto deleteGroup(@PathVariable("groupid") Long groupId, @RequestParam("userId") Long userId) {
		return groupService.deleteGroup(groupId, userId);
	}

	@PostMapping("/enter/{groupid}")
	public ResultResponseDto enterGroup(@PathVariable("groupid") Long groupId, GroupEnterRequestDto requestDto) {
		return groupService.enterGroup(groupId, requestDto);
	}

//	@PostMapping("/apply/{groupid}")
//	public ResultResponseDto applyGroup(@PathVariable("groupid") Long groupId, Long userId) {
//		return groupService.applyGroup(groupId, userId);
//	}
//
//	@GetMapping("/apply/{groupid}")
//	public GroupApplyReadResponseDto readGroupApplies(@PathVariable("groupid") Long groupId, Long userId) {
//		return groupService.readGroupApplies(groupId, userId);
//	}
//
//	@PostMapping("/approve")
//	public ResultResponseDto approveGroupApply(GroupApproveRequestDto requestDto) {
//		return groupService.approveGroupApply(requestDto);
//	}

	@GetMapping("/members")
	public GroupMemberReadResponseDto readGroupMembers(@RequestParam("groupId") Long groupId) {
		return groupService.readGroupMembers(groupId);
	}
}
