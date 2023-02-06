package com.seoro.seoro.domain.dto.Group;

import java.util.List;

import com.seoro.seoro.domain.entity.Member.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GroupMainResponseDto {
	private Boolean result;
	private List<GroupDetailResponseDto> myGroups;
	private List<GroupDetailResponseDto> recommendGroups;
	private List<Member> members;
}
