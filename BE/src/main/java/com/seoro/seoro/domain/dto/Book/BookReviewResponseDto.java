package com.seoro.seoro.domain.dto.Book;

import com.seoro.seoro.domain.entity.Book.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookReviewResponseDto {
    private Boolean result;
    private List<BookReviewDto> reviews;
}
