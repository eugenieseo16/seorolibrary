package com.seoro.seoro.domain.dto.Place;

import com.seoro.seoro.domain.entity.Place.PlacePhoto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PlaceAddRequestDto {
	private String placeName;
	private Long placeMaker;
	private String placedescrib;
	private String[] placePhoto;
	private String latitude;
	private String longitude;
}
