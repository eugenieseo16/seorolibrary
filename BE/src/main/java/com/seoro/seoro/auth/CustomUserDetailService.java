package com.seoro.seoro.auth;

import java.util.NoSuchElementException;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.entity.Member.Member;
import com.seoro.seoro.repository.Member.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
	private final MemberRepository memberRepository;

	@Override
	@Cacheable(value = CacheKey.USER, key = "#username", unless = "#result == null")
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.info("username: " + username);
		Member member = memberRepository.findByMemberName(username).orElseThrow(() -> new NoSuchElementException("없는 회원입니다."));
		return CustomUserDetails.of(member);
	}
}