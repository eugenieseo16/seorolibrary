package com.seoro.seoro.domain.dto.GroupPost;

import lombok.Data;

@Data
public class GroupPostReadRequestDto {
	private Long groupId;
	private String postCategory;
	private int startIdx;
	private int limit;
}
