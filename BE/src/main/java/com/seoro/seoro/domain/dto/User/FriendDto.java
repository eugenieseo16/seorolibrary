package com.seoro.seoro.domain.dto.User;

import com.seoro.seoro.domain.entity.User.User;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FriendDto {
	private Long friendId;
	private Long userId;
}
