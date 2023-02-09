package com.seoro.seoro.domain.dto.Member;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FriendDto {
	private Long followerId;
	private Long followingId;
}
