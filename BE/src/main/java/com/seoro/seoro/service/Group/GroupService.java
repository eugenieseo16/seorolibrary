package com.seoro.seoro.service.Group;

import com.seoro.seoro.domain.dto.Group.*;
import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.ResultResponseDto;

@Service
public interface GroupService {
	public GroupMainResponseDto groupMain(String userName);
	public ResultResponseDto makeGroup(GroupSignupRequestDto requestDto);
	public GroupDetailResponseDto groupDetail(Long groupId);
	public ResultResponseDto deleteGroup(Long groupId, Long userId);
	public ResultResponseDto applyGroup(Long groupId, Long userId);
	public GroupApplyReadResponseDto readGroupApplies(Long groupId, Long userId);
	public ResultResponseDto approveGroupApply(GroupApproveRequestDto requestDto);
	public GroupMemberReadResponseDto readGroupMembers(Long groupId);
	public ResultResponseDto enterGroup(Long groupId, GroupEnterRequestDto requestDto);
    public ResultResponseDto createGroupSchedule(GroupScheduleCreateRequestDto requestDto);
	public GroupScheduleUpdateResponseDto updateGroupSchedule(GroupScheduleUpdateRequestDto requestDto);
	public GroupScheduleDetailResponseDto readGroupSchedule(Long scheduleId);
	public GroupScheduleListResponseDto readGroupScheduleList(Long groupId);
	public ResultResponseDto delGroupSchedule(Long scheduleId, Long userId);
}
