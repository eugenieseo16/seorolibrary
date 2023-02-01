package com.seoro.seoro.domain.dto.Group;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GroupDetailResponseDto {
	private Boolean result;
	private String groupName;
	private Date groupStartDate;
	private Date groupEndDate;
	private String groupDongCode;
	private Integer groupCapacity;
	private String groupDescrib;

}
