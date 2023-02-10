package com.seoro.seoro.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoro.seoro.domain.dto.Place.PlaceAddRequestDto;
import com.seoro.seoro.domain.dto.Place.PlaceDto;
import com.seoro.seoro.domain.dto.Place.PlaceShowDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.service.Place.PlaceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/place")
public class PlaceController {

	private final PlaceService placeService;

	@GetMapping()
	public List<PlaceShowDto> findAllPlaces(){
		return placeService.findAllPlaces();
	}

	@PostMapping()
	public ResultResponseDto addPlace(@ModelAttribute PlaceAddRequestDto requestDto){
		return placeService.addPlace(requestDto);
	}

	@GetMapping("/my")
	public List<PlaceShowDto>[] findMyPlaces(){
		return placeService.findMyPlaces();
	}

	@GetMapping("/detail/{placeId}")
	public PlaceDto placeDetail(@PathVariable("placeId") Long placeId){
		PlaceDto placeDto = placeService.placeDetail(placeId);
		return placeDto;
	}

	// @GetMapping("/detail/{isbn}")
	// public BookDto findByIsbn(@PathVariable String isbn) throws IOException, ParseException {
	// 	return bookService.findByIsbn(isbn);
	// }
	//
	// @GetMapping("/review/{isbn}")
	// public ReviewDto searchReviewsByIsbn(@PathVariable String isbn){
	//
	// 	ReviewDto review = bookService.findReviewByIsbnAndMemberId(isbn);
	// 	return review;
	// }

	// @PostMapping("/review/{isbn}")
	// public ResultResponseDto makeReview(@PathVariable("isbn") String isbn, @ModelAttribute ReviewDto requestDto){
	// 	return bookService.makeReview(isbn, requestDto);
	// }

}
