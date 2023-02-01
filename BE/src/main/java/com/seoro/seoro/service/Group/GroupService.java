package com.seoro.seoro.service.Group;

import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Group.GroupSignupRequestDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;

@Service
public interface GroupService {
	public ResultResponseDto makeGroup(GroupSignupRequestDto requestDto);
}
