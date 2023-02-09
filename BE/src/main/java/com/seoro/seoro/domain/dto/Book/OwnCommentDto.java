package com.seoro.seoro.domain.dto.Book;

import com.seoro.seoro.domain.entity.Book.OwnBook;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OwnCommentDto {
	private String isbn;
	private String bookTitle;
	private String bookImage;
	private String ownComment;

	public OwnCommentDto(OwnBook ownBook) {
		this.isbn = ownBook.getIsbn();
		this.bookTitle = ownBook.getBookTitle();
		this.ownComment = ownBook.getOwnComment();
		this.bookImage = ownBook.getBookImage();
	}
}
