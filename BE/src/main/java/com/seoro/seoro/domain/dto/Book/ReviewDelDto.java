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
public class ReviewDelDto {
	private Long reviewId;
	private String memberName;

	public ReviewDelDto(Review review) {
		this.reviewId = review.getReviewId();
		this.memberName = review.getMember().getMemberName();
	}
}
