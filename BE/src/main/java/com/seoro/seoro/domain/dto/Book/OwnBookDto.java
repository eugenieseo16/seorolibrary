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
public class OwnBookDto {
	private Long memberId;
	private String isbn;
	private String bookTitle;
	private String bookImage;
	private String ownComment;
	private String author;
	private String bookDescrib;
	private Boolean isOwn;

	public OwnBookDto(OwnBook ownBook) {
		this.memberId = ownBook.getMember().getMemberId();
		this.isbn = ownBook.getIsbn();
		this.bookTitle = ownBook.getBookTitle();
		this.bookImage = ownBook.getBookImage();
		this.ownComment = ownBook.getOwnComment();
		this.isOwn = ownBook.getIsOwn();
		this.author = ownBook.getAuthor();
		this.bookDescrib = ownBook.getBookdescrib();
	}
}
