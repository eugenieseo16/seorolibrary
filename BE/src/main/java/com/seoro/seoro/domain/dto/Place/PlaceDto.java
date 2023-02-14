package com.seoro.seoro.domain.dto.Place;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.seoro.seoro.domain.entity.Place.PlacePhoto;
import com.seoro.seoro.domain.entity.Place.PlaceReview;

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
	private String[] placePhoto;
	private List<PlaceReviewDto> placeReview;
	private Float score;
}
