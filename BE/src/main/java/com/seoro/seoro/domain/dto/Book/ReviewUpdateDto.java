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
public class ReviewUpdateDto {
	private String isbn;
	private Long reviewId;
	private String bookTitle;
	private String bookImage;
	private String memberName;
	private String reviewContent;

	public ReviewUpdateDto(Review review) {
		this.isbn = review.getReadBook().getIsbn();
		this.reviewId = review.getReviewId();
		this.bookTitle = review.getReadBook().getBookTitle();
		this.bookImage = review.getReadBook().getBookImage();
		this.memberName = review.getMember().getMemberName();
		this.reviewContent = review.getReviewContent();
	}
}
