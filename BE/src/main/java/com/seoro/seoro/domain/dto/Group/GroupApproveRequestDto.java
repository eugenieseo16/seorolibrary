package com.seoro.seoro.domain.dto.Group;

import lombok.Data;

@Data
public class GroupApproveRequestDto {
	private Long groupId;
	private Long groupApplyId;
	private Long userId;
	private Long applyUserId;
	private Boolean isApprove;
}
