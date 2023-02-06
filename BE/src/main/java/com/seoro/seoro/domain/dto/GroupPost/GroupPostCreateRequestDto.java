package com.seoro.seoro.domain.dto.GroupPost;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class GroupPostCreateRequestDto {
    private Long groupId;
    private Long writer;
    private String postTitle;
    private String postCategory;
    private String postContent;
    private LocalDateTime postTime;
//    private String[] postImage;
}
