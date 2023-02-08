package com.seoro.seoro.domain.dto.Group;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupMemberReadResponseDto {
	private Boolean result;
	private List<GroupMemberDto> groupMembers;
}
