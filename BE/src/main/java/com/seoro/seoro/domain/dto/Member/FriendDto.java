package com.seoro.seoro.domain.dto.Member;

import com.seoro.seoro.domain.entity.Member.Friend;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FriendDto {
	private Long followerId; // 나
	private Long followingId; // 친구

	public FriendDto(Friend friend) {
		this.followerId = friend.getFollower().getMemberId();
		this.followingId = friend.getFollowing();
	}
}
