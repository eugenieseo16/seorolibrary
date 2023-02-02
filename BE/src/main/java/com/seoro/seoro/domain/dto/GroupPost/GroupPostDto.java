package com.seoro.seoro.domain.dto.GroupPost;

import com.seoro.seoro.domain.entity.Groups.PostCategory;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class GroupPostDto {
    private String postTitle;
    private PostCategory postCategory;
    private String userName;
    private Date postTime;
}
