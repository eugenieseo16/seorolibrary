package com.seoro.seoro.domain.dto.Library;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OwnBookDto {
	private Long userId;
	private String isbn;
	private String ownComment;
	private Boolean isOwn;
}
