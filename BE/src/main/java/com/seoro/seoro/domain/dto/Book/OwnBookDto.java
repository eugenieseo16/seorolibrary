package com.seoro.seoro.domain.dto.Book;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OwnBookDto {
	private Long userId;
	private String isbn;
	private String ownComment;
	private Boolean isOwn;
}
