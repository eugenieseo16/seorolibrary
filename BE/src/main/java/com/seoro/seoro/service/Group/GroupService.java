package com.seoro.seoro.service.Group;

import com.seoro.seoro.domain.dto.Group.GroupDetailResponseDto;
import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Group.GroupMainResponseDto;
import com.seoro.seoro.domain.dto.Group.GroupSignupRequestDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;

@Service
public interface GroupService {
	public GroupMainResponseDto groupMain(String userName);
	public ResultResponseDto makeGroup(GroupSignupRequestDto requestDto);
	public GroupDetailResponseDto groupDetail(Long groupId);
}
