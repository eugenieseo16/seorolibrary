package com.seoro.seoro.domain.dto.Book;


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
	private String userName;
	private String reviewContent;
}
