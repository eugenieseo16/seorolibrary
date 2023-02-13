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
	private BookDetailDto bookDetailDto;
	private String ownComment;
	private boolean isOwn;
	private List<OwnBookDto> ownBooks;
}
