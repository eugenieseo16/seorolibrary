package com.seoro.seoro.domain.dto.Library;

import java.util.Date;

import com.seoro.seoro.domain.entity.ChatRoom.ChatRoom;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RentBookDto {
	private Long rendBookId;
	private ChatRoom chatRoom;
	private String isbn;
	private Date rendDate;
	private Boolean isReturn;
}
