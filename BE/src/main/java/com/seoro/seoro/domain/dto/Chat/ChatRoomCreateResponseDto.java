package com.seoro.seoro.domain.dto.Chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomCreateResponseDto {
	private Boolean result;
	private Long chatRoomId;
}
