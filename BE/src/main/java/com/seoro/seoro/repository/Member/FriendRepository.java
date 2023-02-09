package com.seoro.seoro.repository.Member;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seoro.seoro.domain.entity.Member.Friend;

public interface FriendRepository extends JpaRepository<Friend, Long> {
}
