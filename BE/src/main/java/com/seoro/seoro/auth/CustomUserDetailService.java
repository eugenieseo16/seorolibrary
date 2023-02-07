package com.seoro.seoro.auth;

import java.util.NoSuchElementException;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.entity.Member.Member;
import com.seoro.seoro.repository.Member.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
	private final MemberRepository memberRepository;

	@Override
	// @Cacheable(value = CacheKey.USER, key = "#username", unless = "#result == null")
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Member member = memberRepository.findByMemberEmail(username).orElseThrow(() -> new NoSuchElementException("없는 회원입니다."));
		return CustomUserDetails.of(member);
	}
}
