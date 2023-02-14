package com.seoro.seoro.domain.dto.Place;

import java.util.List;

import com.seoro.seoro.domain.entity.Place.PlacePhoto;
import com.seoro.seoro.domain.entity.Place.PlaceReview;
import com.seoro.seoro.domain.entity.Place.PlaceReviewPhoto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlaceReviewDto {
	private Long placeReviewId;
	private String[] placeReviewPhotos;
	private Double score;
	private String memberName;
	private String reviewContent;
}
