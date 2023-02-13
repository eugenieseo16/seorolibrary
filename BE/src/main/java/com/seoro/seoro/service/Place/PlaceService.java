package com.seoro.seoro.service.Place;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Place.PlaceAddRequestDto;
import com.seoro.seoro.domain.dto.Place.PlaceDto;
import com.seoro.seoro.domain.dto.Place.PlaceReviewAddRequestDto;
import com.seoro.seoro.domain.dto.Place.PlaceShowDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;

@Service
public interface PlaceService {

	List<PlaceShowDto> findAllPlaces(Long memberId);

	List<PlaceShowDto>[] findMyPlaces(Long memberId);

	ResultResponseDto addPlace(PlaceAddRequestDto requestDto) throws IOException, URISyntaxException, ParseException;

	PlaceDto placeDetail(Long placeId);

	ResultResponseDto makeReview(Long placeId, PlaceReviewAddRequestDto requestDto);
}
