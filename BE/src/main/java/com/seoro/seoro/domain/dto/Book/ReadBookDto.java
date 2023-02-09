package com.seoro.seoro.domain.dto.Book;

import java.util.Date;

import com.seoro.seoro.domain.entity.Book.ReadBook;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReadBookDto {
	private Long userId;
	private String isbn;
	private String bookTitle;
	private String bookImage;
	private Date readDate;

	public ReadBookDto(ReadBook readBook) {
		this.userId = readBook.getMember().getMemberId();
		this.isbn = readBook.getIsbn();
		this.bookTitle = readBook.getBookTitle();
		this.bookImage = readBook.getBookImage();
		this.readDate = readBook.getReadDate();
	}
}
