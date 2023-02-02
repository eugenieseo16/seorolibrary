package com.seoro.seoro.domain.dto.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDto {
	private Long userId;
	private String userName;
	private String userProfile;
	private String userDongCode;
	private Integer userScore;
	private Long followerCnt;
	private Long followingCnt;
}