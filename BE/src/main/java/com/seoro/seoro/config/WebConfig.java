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
			.allowedOrigins("http://i8A209.p.ssafy.io:80", "https://i8A209.p.ssafy.io:443");
	}
}
