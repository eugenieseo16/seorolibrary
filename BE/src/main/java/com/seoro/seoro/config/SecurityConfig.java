package com.seoro.seoro.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.seoro.seoro.auth.CustomUserDetailService;
import com.seoro.seoro.auth.JwtAuthenticationFilter;
import com.seoro.seoro.auth.JwtEntryPoint;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	private final JwtEntryPoint jwtEntryPoint;
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	private final CustomUserDetailService customUserDetailService;

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager() throws Exception {
		return super.authenticationManager();
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/css/**", "/script/**", "image/**", "/fonts/**", "lib/**");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors()
			.and()
			.csrf().disable()
				.headers()
					.frameOptions().sameOrigin();

		// 개발 진행 중이므로 지금은 접근 권한 모두 허용
		http.authorizeRequests()
			.anyRequest().permitAll();

		// jwtEntryPoint에서 에러 해결
		http.exceptionHandling().
			authenticationEntryPoint(jwtEntryPoint);

		// logout jwt 처리 및 redis 사용 위해 session 정보 stateless
		http.logout().disable()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		// UsernamePasswordAuthenticationFilter 전에 JwtAuthenticationFilter 필터 추가
		http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(customUserDetailService).passwordEncoder(passwordEncoder());
	}
}
