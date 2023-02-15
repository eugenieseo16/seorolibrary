package com.seoro.seoro.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class RedisConfiguration {
	@Value("i8A209.p.ssafy.io")
	private String redisHost;

	@Value("6379")
	private int redisPort;

	@Value("ssafy")
	private String password;

	@Bean
	public RedisConnectionFactory redisConnectionFactory() {
		LettuceConnectionFactory lettuceConnectionFactory = new LettuceConnectionFactory();
		lettuceConnectionFactory.setHostName(redisHost);
		lettuceConnectionFactory.setPort(redisPort);
		lettuceConnectionFactory.setPassword(password);
		return lettuceConnectionFactory;
	}
}
