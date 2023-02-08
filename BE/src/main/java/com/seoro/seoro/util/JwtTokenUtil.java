package com.seoro.seoro.util;

import static com.seoro.seoro.auth.JwtExpirationEnums.*;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtTokenUtil {
	@Value("${jwt.secret}")
	private String SECRET_KEY;

	public Claims extractAllClaims(String token) {
		// 토큰 추출 메서드
		return Jwts.parserBuilder()
			.setSigningKey(getSigningKey(SECRET_KEY)) // secretkey로 서명
			.build()
			.parseClaimsJws(token)// payload 추출
			.getBody();
	}

	public String getUsername(String accessToken) {
		return extractAllClaims(accessToken).get("username", String.class);
	}

	private Key getSigningKey(String secretKey) {
		byte[] KeyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
		return Keys.hmacShaKeyFor(KeyBytes);
	}

	public boolean isTokenExpired(String accessToken) {
		Date expiration = extractAllClaims(accessToken).getExpiration();
		return expiration.before(new Date(System.currentTimeMillis()));
	}

	public String generateAccessToken(String username) {
		return doGenerateToken(username, ACCESS_TOKEN_EXPIRATION_TIME.getValue());
	}

	public String generateRefreshToken(String username) {
		return doGenerateToken(username, REFRESH_TOKEN_EXPIRATION_TIME.getValue());
	}

	private String doGenerateToken(String username, long expireTime) {
		// 토큰 생성 메서드
		Claims claims = Jwts.claims();
		claims.put("username", username);

		return Jwts.builder()
			.setClaims(claims)
			.setIssuedAt(new Date(System.currentTimeMillis()))
			.setExpiration(new Date(System.currentTimeMillis() + expireTime))
			.signWith(getSigningKey(SECRET_KEY), SignatureAlgorithm.HS256) //  secretkey로 서명 후 HS256 알고리즘으로 암호화
			.compact();
	}

	public boolean validateToken(String accessToken, UserDetails userDetails) {
		String username = getUsername(accessToken);
		return username.equals(userDetails.getUsername()) && !isTokenExpired(accessToken);
	}

	public long getRemainMilliSeconds(String accessToken) {
		Date expiration = extractAllClaims(accessToken).getExpiration();
		Date now = new Date(System.currentTimeMillis());
		return expiration.getTime() - now.getTime();
	}
}
