package com.seoro.seoro.domain.dto.Group;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GroupSignupRequestDto {
	private String groupName;
	private Long groupHost;
	private String groupPassword;
	private Integer groupCapacity;
	private String groupDongCode;
	private String groupProfile;
	private Date groupStartDate;
	private Date groupEndDate;
	private Long[] groupGenres;
	private String groupIntroduction;
}
