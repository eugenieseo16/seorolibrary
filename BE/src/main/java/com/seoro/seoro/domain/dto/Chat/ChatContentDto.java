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
public class ChatContentDto {
	private Long writerId;
	private String writerName;
	private String message;
	private LocalDateTime messageTime;
}
