package com.seoro.seoro.domain.dto.Member;

import java.util.Date;

import com.seoro.seoro.domain.entity.Member.LoginType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
	private Long userId;
	private String userEmail;
	private String userName;
	private String userPassword;
	private String userProfile;
	private String userDongCode;
	private LoginType loginType;
	private Date withdrawalDate;
	private Integer userScore;
}
