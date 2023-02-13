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
public class ShowBookDto {
	private boolean result;
	private String isbn;
	private String bookTitle;
	private String bookAuthor;
	private String bookImage;
	private String bookDescrib;
	private Date bookPubDate;
	private Boolean isOwn;
	private Long memberId;
}
