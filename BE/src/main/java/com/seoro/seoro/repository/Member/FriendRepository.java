package com.seoro.seoro.repository.Member;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seoro.seoro.domain.entity.Member.Friend;
import com.seoro.seoro.domain.entity.Member.Member;

public interface FriendRepository extends JpaRepository<Friend, Long> {
	Optional<Friend> findByFollowerAndFollowing(Member follower, Long following);

	Long countByFollowing(Long memberId);

	Long countByFollower(Member member);
}
