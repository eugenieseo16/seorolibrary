package com.seoro.seoro.domain.dto.Book;

import java.util.Date;
import java.util.List;

import com.seoro.seoro.domain.entity.Member.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OwnBookDetailDto {
	private boolean result;
	private String messege;
	private String isbn;
	private String bookTitle;
	private String bookAuthor;
	private String bookPublisher;
	private String bookImage;
	private String bookDescrib;
	private String bookPubDate;
	private Long countReader;
	private Long countComment;
	private Long countReview;

	// 보유도서 란 정보
	private String ownComment;
	private boolean isOwn;
	private List<OwnBookDto> ownBookList;

	public OwnBookDetailDto(BookDetailDto bookDetailDto) {
		this.isbn = bookDetailDto.getIsbn();
		this.bookTitle = bookDetailDto.getBookTitle();
		this.bookAuthor = bookDetailDto.getBookAuthor();
		this.bookPublisher = bookDetailDto.getBookPublisher();
		this.bookImage = bookDetailDto.getBookImage();
		this.bookDescrib = bookDetailDto.getBookDescrib();
		this.bookPubDate = bookDetailDto.getBookPubDate();
		this.countReader = bookDetailDto.getCountReader();
		this.countComment = bookDetailDto.getCountComment();
		this.countReview = bookDetailDto.getCountReview();
	}
}
