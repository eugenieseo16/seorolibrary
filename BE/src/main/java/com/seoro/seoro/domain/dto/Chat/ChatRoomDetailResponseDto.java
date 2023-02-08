package com.seoro.seoro.domain.dto.Chat;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomDetailResponseDto {
	private Boolean result;
	private List<ChatContentDto> chattingContent;
}
