package com.seoro.seoro.domain.dto.Member;

import com.seoro.seoro.auth.JwtHeaderUtilEnums;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenDto {
	private String grantType;
	private String accessToken;
	private String refreshToken;

	public static TokenDto of(String accessToken, String refreshToken) {
		return TokenDto.builder()
			.grantType(JwtHeaderUtilEnums.GRANT_TYPE.getValue())
			.accessToken(accessToken)
			.refreshToken(refreshToken)
			.build();
	}
}
