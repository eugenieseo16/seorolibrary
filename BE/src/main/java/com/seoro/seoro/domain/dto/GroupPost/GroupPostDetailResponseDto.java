package com.seoro.seoro.domain.dto.GroupPost;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupPostDetailResponseDto {
	private Boolean result;
	private String postTitle;
	private String postCategory;
	private String userName;
	private String postContent;
	private Date postTime;
	private String[] postImage;
}
