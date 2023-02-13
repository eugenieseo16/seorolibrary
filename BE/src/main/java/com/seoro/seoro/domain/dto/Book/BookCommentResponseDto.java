package com.seoro.seoro.domain.dto.Book;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookCommentResponseDto {
    private boolean result;
    private List<BookCommentDto> comments;
}
