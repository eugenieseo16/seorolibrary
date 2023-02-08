package com.seoro.seoro.domain.dto.Chat;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomShortDto {
	private Long chatRoomId;
	private Long otherUserId;
	private String otherUserName;
	private String latestMessage;
	private LocalDateTime latestMessageTime;
}
