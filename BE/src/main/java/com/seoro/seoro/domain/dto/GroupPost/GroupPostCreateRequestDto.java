package com.seoro.seoro.domain.dto.GroupPost;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class GroupPostCreateRequestDto {
    private Long groupId;
    private Long writer;
    private String postTitle;
    private String postCategory;
    private String postContent;
    private Date postTime;
    private String[] postImage;
}
