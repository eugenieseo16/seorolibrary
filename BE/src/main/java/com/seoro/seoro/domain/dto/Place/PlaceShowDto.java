package com.seoro.seoro.domain.dto.Place;

import java.util.List;

import com.seoro.seoro.domain.entity.Place.PlacePhoto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlaceShowDto {
	private boolean result;
	private Long placeId;
	private String placeName;
	private String placeDescrib;
	private String placeLatitude;
	private String placeLongitude;
	private Double score;
	private List<String> placePhotoList;
}
