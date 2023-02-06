package com.seoro.seoro.domain.dto.GroupPost;

import com.seoro.seoro.domain.entity.Groups.PostCategory;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Builder
public class GroupPostDto {
    private Long postId;
    private String postTitle;
    private String postCategory;
    private String postContent;
    private String userName;
    private Date postTime;
    private List<GroupPostImageDto> images;
}
