package com.seoro.seoro.domain.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserProfileDto {
	private Long userId;
	private String userName;
	private String userProfile;
	private String userDongCode;
	private Integer userScore;
	private Integer followerCnt;
	private Integer followingCnt;
}