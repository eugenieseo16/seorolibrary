package com.seoro.seoro.controller;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;

import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoro.seoro.domain.dto.Place.PlaceAddRequestDto;
import com.seoro.seoro.domain.dto.Place.PlaceDto;
import com.seoro.seoro.domain.dto.Place.PlaceReviewAddRequestDto;
import com.seoro.seoro.domain.dto.Place.PlaceShowDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.service.Place.PlaceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/place")
public class PlaceController {

	private final PlaceService placeService;

	//내 주변 모든 장소 출력
	@GetMapping()
	public List<PlaceShowDto> findAllPlaces(@RequestBody HashMap<String, Long> requestJSON){
		return placeService.findAllPlaces(requestJSON.get("memberId"));
	}

	//장소 추가
	@PostMapping()
	public ResultResponseDto addPlace(@RequestBody PlaceAddRequestDto requestDto) throws
		IOException,
		URISyntaxException,
		ParseException {
		return placeService.addPlace(requestDto);
	}

	//내가 추가한 장소, 내가 리뷰쓴 장소 출력
	@GetMapping("/my")
	public List<PlaceShowDto>[] findMyPlaces(@RequestBody HashMap<String, Long> requestJSON){
		return placeService.findMyPlaces(requestJSON.get("memberId"));
	}

	//장소 상세 정보
	@GetMapping("/detail/{placeId}")
	public PlaceDto placeDetail(@PathVariable("placeId") Long placeId){
		PlaceDto placeDto = placeService.placeDetail(placeId);
		return placeDto;
	}

	//장소 리뷰 등록
	@PostMapping("/detail/{placeId}")
	public ResultResponseDto makeReview(@PathVariable("placeId") Long placeId, @RequestBody PlaceReviewAddRequestDto requestDto){
		return placeService.makeReview(placeId, requestDto);
	}

	@GetMapping("/dong")
	public String placeDetail(PlaceAddRequestDto requestDto) throws ParseException, URISyntaxException {
		String dong = placeService.getDong(requestDto);
		return dong;
	}
}
