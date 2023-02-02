package com.seoro.seoro.repository.User;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seoro.seoro.domain.entity.User.Friend;

public interface FriendRepository extends JpaRepository<Friend, Long> {
	Long coundByuserId(Long userId);
}
