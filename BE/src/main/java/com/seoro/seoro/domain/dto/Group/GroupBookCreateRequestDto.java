package com.seoro.seoro.domain.dto.Group;

import com.seoro.seoro.domain.entity.Groups.Groups;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GroupBookCreateRequestDto {
	private Long userId;
	private Long groupId;
	private String isbn;
	private String bookTitle;
	private String bookImage;
}
