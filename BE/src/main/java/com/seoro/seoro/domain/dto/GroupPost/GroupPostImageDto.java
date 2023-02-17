package com.seoro.seoro.domain.dto.GroupPost;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GroupPostImageDto {
	private Long imageId;
	private String image;
}
