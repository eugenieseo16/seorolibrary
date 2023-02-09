package com.seoro.seoro.domain.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResultResponseDto {
	private Boolean result;

	public ResultResponseDto(boolean result) {
		this.result = result;
	}
}
