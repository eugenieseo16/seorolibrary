package com.seoro.seoro.domain.dto.GroupPost;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupPostUpdateRequestDto {
	private Long groupId;
	private Long writer;
	private String postTitle;
	private String postCategory;
	private String postContent;
	private Date postTime;
}
