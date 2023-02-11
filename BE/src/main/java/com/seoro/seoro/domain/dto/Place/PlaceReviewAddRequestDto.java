package com.seoro.seoro.domain.dto.Place;

import java.util.List;

import com.seoro.seoro.domain.entity.Place.PlaceReviewPhoto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlaceReviewAddRequestDto {
	private String placereview;
	private List<PlaceReviewPhoto> placeReviewPhotos;
	private Long score;
	private String memberName;
}
