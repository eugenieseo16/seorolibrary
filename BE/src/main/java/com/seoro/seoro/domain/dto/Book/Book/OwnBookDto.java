package com.seoro.seoro.domain.dto.Book.Book;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OwnBookDto {
	private Long ownBookId;
	private Long userId;
	private String isbn;
	private String ownComment;
	private Boolean isOwn;
}
