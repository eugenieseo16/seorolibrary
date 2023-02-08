package com.seoro.seoro.auth;

import javax.persistence.Id;

import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@RedisHash("logoutAccessToken")
@AllArgsConstructor
@Builder
public class LogoutAcessToken {
	@Id
	private String id;

	private String username;

	@TimeToLive
	private Long expiration;

	public static LogoutAcessToken of(String accessToken, String username, Long remainingMilliSeconds) {
		return LogoutAcessToken.builder()
			.id(accessToken)
			.username(username)
			.expiration(remainingMilliSeconds / 1000)
			.build();
	}
}
