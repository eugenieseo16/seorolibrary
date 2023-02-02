package com.seoro.seoro.domain.dto.Book;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReadBookDto {
	private Long readBookId;
	private Long userId;
	private String ownComment;
	private Date readDate;
}
