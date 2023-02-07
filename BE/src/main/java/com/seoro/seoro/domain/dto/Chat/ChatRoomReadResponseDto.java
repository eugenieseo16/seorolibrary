package com.seoro.seoro.domain.dto.Chat;

import java.util.List;

import lombok.Data;

@Data
public class ChatRoomReadResponseDto {
	private boolean result;
	private List<ChatRoomShortDto> chatRooms;
}
