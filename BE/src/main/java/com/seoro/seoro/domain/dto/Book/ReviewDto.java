package com.seoro.seoro.domain.dto.Book;


import com.seoro.seoro.domain.entity.Book.Review;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {
	private String isbn;
	private String bookTitle;
	private String bookImage;
	private String memberName;
	private String reviewContent;

	public ReviewDto(Review review) {
		this.isbn = review.getReadBook().getIsbn();
		this.bookTitle = review.getReadBook().getBookTitle();
		this.bookImage = review.getReadBook().getBookImage();
		this.memberName = review.getMember().getMemberName();
		this.reviewContent = review.getReviewContent();
	}
}
