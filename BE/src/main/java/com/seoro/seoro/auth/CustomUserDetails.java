package com.seoro.seoro.auth;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.seoro.seoro.domain.entity.Member.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomUserDetails implements UserDetails {
	private String username;
	private String password;

	// @Builder.Default
	// private List<String> roles = new ArrayList<>();

	public static UserDetails of(Member member) {
		return CustomUserDetails.builder()
			.username(member.getMemberName())
			.password(member.getMemberPassword())
			.build();
	}

	@Override
	@JsonIgnore
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// return roles.stram().map(SimpleGrantedAuthority::new).collect(toList());
		return null;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	@JsonIgnore
	public boolean isAccountNonExpired() {
		return false;
	}

	@Override
	@JsonIgnore
	public boolean isAccountNonLocked() {
		return false;
	}

	@Override
	@JsonIgnore
	public boolean isCredentialsNonExpired() {
		return false;
	}

	@Override
	@JsonIgnore
	public boolean isEnabled() {
		return false;
	}
}
