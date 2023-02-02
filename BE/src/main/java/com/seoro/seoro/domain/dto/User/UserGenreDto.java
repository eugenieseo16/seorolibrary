package com.seoro.seoro.domain.dto.User;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserGenreDto {
	private Long userGenreId;
	private Long userId;
	private Long genreId;
}
