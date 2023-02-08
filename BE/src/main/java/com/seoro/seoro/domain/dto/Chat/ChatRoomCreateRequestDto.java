package com.seoro.seoro.domain.dto.Chat;

import lombok.Data;

@Data
public class ChatRoomCreateRequestDto {
	private Long userId;
	private Long otherUserId;
	private String rendBookIsbn;
}
