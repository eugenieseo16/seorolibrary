package com.seoro.seoro.domain.dto.Book;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookDto {
	private boolean result;
	private String isbn;
	private String bookTitle;
	private String bookAuthor;
	private String bookPublisher;
	private String bookImage;
	private String bookDescrib;
	private Date bookPubDate;
}
