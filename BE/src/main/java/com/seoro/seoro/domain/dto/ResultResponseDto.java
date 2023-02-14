package com.seoro.seoro.domain.dto;

import java.util.Map;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResultResponseDto {
	private Map<String, String> errorMap;
	private String messege;
	private Boolean result;

	public ResultResponseDto(boolean result) {
		this.result = result;
	}
}
