package com.seoro.seoro.domain.dto.Book;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookCommentDto {
    private Long memberId;
    private String memberName;
    private String memberProfile;
    private String comment;
}
