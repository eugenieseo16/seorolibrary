package com.seoro.seoro.domain.dto.Group;

import java.util.List;

import com.seoro.seoro.domain.entity.Groups.Groups;
import com.seoro.seoro.domain.entity.User.User;

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
	private List<Groups> myGroups;
	private List<Groups> recommendGroups;
	private List<User> users;
}
