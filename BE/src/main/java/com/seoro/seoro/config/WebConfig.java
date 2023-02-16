package com.seoro.seoro.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry){
		registry.addMapping("/**")
			.exposedHeaders("X-AUTH-TOKEN")
			// .allowCredentials(true);
			.allowedMethods("*")
			.allowedOrigins("http://i8a209.p.ssafy.io:5173", "http://i8a209.p.ssafy.io:3000",
					"http://localhost:3000", "http://localhost:5173",
				"http://i8a209.p.ssafy.io:8080", "http://localhost:8080",
				"http://70.12.246.221:8080", "http://127.0.0.1:5173"
				, "http://127.0.0.1:3000");
	}
}
