package com.seoro.seoro.domain.dto.Book;

import com.seoro.seoro.domain.entity.Book.OwnBook;
import com.seoro.seoro.domain.entity.Member.Member;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OwnCommentDetailDto {
	private Member member;
	private String ownComment;

	public OwnCommentDetailDto(OwnBook ownBook) {
		this.member = ownBook.getMember();
		this.ownComment = ownBook.getOwnComment();
	}
}
