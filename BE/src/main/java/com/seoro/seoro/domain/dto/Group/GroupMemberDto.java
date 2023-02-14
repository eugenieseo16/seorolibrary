package com.seoro.seoro.domain.dto.Group;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupMemberDto {
	private Long userId;
	private String userProfile;
	private String userName;
}
