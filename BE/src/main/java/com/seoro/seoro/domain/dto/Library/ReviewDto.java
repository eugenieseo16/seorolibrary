package com.seoro.seoro.domain.dto.Library;

import com.seoro.seoro.domain.entity.Book.Book;
import com.seoro.seoro.domain.entity.User.User;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewDto {
	private Long reviewId;
	private User user;
	private Book book;
	private String reviewContent;
}
