package com.seoro.seoro.domain.dto.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class MemberPasswordDto {
	private String memberPassword;
	private String newPassword;
	private String checkPassword;
}
