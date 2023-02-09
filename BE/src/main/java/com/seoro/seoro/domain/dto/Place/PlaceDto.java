package com.seoro.seoro.domain.dto.Place;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlaceDto {
	private boolean result;
	private Long placeId;
	private String placeName;
	private String placeLatitude;
	private String placeLongitude;
	private Long score;
}
