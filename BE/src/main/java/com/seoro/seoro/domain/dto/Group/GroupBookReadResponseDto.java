package com.seoro.seoro.domain.dto.Group;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GroupBookReadResponseDto {
	private Boolean result;
	private List<GroupBookDto> books;
}
