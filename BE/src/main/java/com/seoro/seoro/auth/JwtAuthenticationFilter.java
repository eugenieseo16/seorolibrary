package com.seoro.seoro.auth;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.filter.OncePerRequestFilter;

import com.seoro.seoro.util.JwtTokenUtil;

import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	private final JwtTokenUtil jwtTokenUtil;
	private final CustomUserDetailService customUserDetailService;
	private final LogoutAccessTokenRedisRepositoty logoutAccessTokenRedisRepositoty;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		String accessToken = getToken(request);
		if(accessToken != null) {
			checkLogout(accessToken); // 로그아웃 토큰인지 검사
			String username = jwtTokenUtil.getUsername(accessToken);
			// log.info("doFilterInternal");
			// log.info("username: " + username);
			if(username != null) {
				// 토큰의 username과 userDetailServiced의 username이 같은지 검사
				UserDetails userDetails = customUserDetailService.loadUserByUsername(username);
				equalsUsernameFromTokenAndUserDetails(userDetails.getUsername(), username);
				validateAccessToken(accessToken, userDetails);
				processSecurity(request, userDetails); // 유저 정보 SecurityContext 추가
			}
		}
		filterChain.doFilter(request, response);
	}

	private void processSecurity(HttpServletRequest request, UserDetails userDetails) {
		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());
		usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
		SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
	}

	private void validateAccessToken(String accessToken, UserDetails userDetails) {
		if (!jwtTokenUtil.validateToken(accessToken, userDetails)) {
			throw new IllegalArgumentException("토큰 검증 실패");
		}
	}

	private void equalsUsernameFromTokenAndUserDetails(String userDetailsUsername, String tokenUsername) {
		if (!userDetailsUsername.equals(tokenUsername)) {
			throw new IllegalArgumentException("email이 토큰과 맞지 않습니다.");
		}
	}

	private void checkLogout(String accessToken) {
		if(logoutAccessTokenRedisRepositoty.existsById(accessToken)) {
			throw new IllegalArgumentException("이미 로그아웃된 회원입니다.");
		}
	}

	private String getToken(HttpServletRequest request) {
		String headerAuth = request.getHeader("Authorization");
		if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
			return headerAuth.substring(7);
		}
		return null;
	}
}
