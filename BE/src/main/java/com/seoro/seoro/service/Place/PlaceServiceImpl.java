package com.seoro.seoro.service.Place;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Book.BookDto;
import com.seoro.seoro.domain.dto.Book.ReviewDto;
import com.seoro.seoro.domain.dto.Place.PlaceAddRequestDto;
import com.seoro.seoro.domain.dto.Place.PlaceDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.domain.entity.Book.Review;
import com.seoro.seoro.domain.entity.Groups.GroupJoin;
import com.seoro.seoro.domain.entity.Groups.Groups;
import com.seoro.seoro.domain.entity.Member.Member;
import com.seoro.seoro.domain.entity.Place.Place;
import com.seoro.seoro.domain.entity.Place.PlacePhoto;
import com.seoro.seoro.domain.entity.Place.PlaceReview;
import com.seoro.seoro.repository.Book.ReadBookRepository;
import com.seoro.seoro.repository.Book.ReviewRepository;
import com.seoro.seoro.repository.Member.MemberRepository;
import com.seoro.seoro.repository.Place.PlacePhotoRepository;
import com.seoro.seoro.repository.Place.PlaceRepository;
import com.seoro.seoro.repository.Place.PlaceReviewRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlaceServiceImpl implements PlaceService {

	final PlaceRepository placeRepository;
	final PlaceReviewRepository placeReviewRepository;
	final PlacePhotoRepository placePhotoRepository;
	final MemberRepository memberRepository;

	@Override
	public List<PlaceDto> findAllPlaces() {
		List<Place> list = placeRepository.findAll();
		String myDongCode = "1123064";
		Collections.sort(list, new Comparator<Place>() {
			@Override
			public int compare(Place o1, Place o2) {
				if(myDongCode.equals(o1.getDongCode())==myDongCode.equals(o2.getDongCode())){
					return (int)(o2.getScore()-o1.getScore());
				} else if (myDongCode.equals(o1.getDongCode())) {
					return -1;
				}else{
					return 1;
				}
			}
		});
		List<PlaceDto> dtoList = new ArrayList<>();
		for(Place place: list){
			dtoList.add(PlaceDto.builder()
					.placeLongitude(place.getPlaceLongitude())
					.placeLatitude(place.getPlaceLatitude())
					.placeId(place.getPlaceId())
					.placeName(place.getPlaceName())
					.build());
		}
		return dtoList;
	}

	@Override
	public List<PlaceDto>[] findMyPlaces() {
		Long memberId = 999L;
		List<Place> list1 = placeRepository.findByMember_MemberId(memberId);
		List<PlaceDto>[] dtoList = new ArrayList[2];
		dtoList[0] = new ArrayList<>();
		dtoList[1] = new ArrayList<>();
		for(Place place: list1){
			dtoList[0].add(PlaceDto.builder()
				.placeLongitude(place.getPlaceLongitude())
				.placeLatitude(place.getPlaceLatitude())
				.placeId(place.getPlaceId())
				.placeName(place.getPlaceName())
				.score(place.getScore())
				.build());
		}
		List<PlaceReview> list2 = placeReviewRepository.findByMember_MemberId(memberId);
		for(PlaceReview review: list2){
			dtoList[1].add(PlaceDto.builder()
				.placeLongitude(review.getPlace().getPlaceLongitude())
				.placeLatitude(review.getPlace().getPlaceLatitude())
				.placeId(review.getPlace().getPlaceId())
				.placeName(review.getPlace().getPlaceName())
				.score(review.getPlace().getScore())
				.build());
		}
		return dtoList;
	}

	@Override
	public ResultResponseDto addPlace(PlaceAddRequestDto requestDto) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();
		Place savePlace = new Place();
		//동코드, 좌표 받음
		String placeDongCode = "";
		Member maker = new Member();
		Optional<Member> tmpUser = memberRepository.findById(requestDto.getPlaceMaker());
		if(tmpUser.isPresent()) {
			maker = tmpUser.get();
		}else {
			maker = tmpUser.orElse(null);
			resultResponseDto.setResult(false);
			return resultResponseDto;
		}

		savePlace = Place.builder()
			.member(maker)
			.placeName(requestDto.getPlaceName())
			.placeLatitude(requestDto.getLatitude())
			.placeLongitude(requestDto.getLongitude())
			.dongCode(placeDongCode)
			.score(0L)
			.describ(requestDto.getPlacedescrib())
			.build();
		//안쓰는듯
		// PlaceReview placeReview = new PlaceReview();
		// PlacePhoto placePhoto = new PlacePhoto();
		// placeReview = PlaceReview.builder()
		// 	.place(savePlace)
		// 	.build();
		//
		// placePhoto = PlacePhoto.builder()
		// 			.place(savePlace)
		// 			.photo(requestDto.getPlacePhoto())
		// 			.build();
		// placeReviewRepository.save(placeReview);
		// placePhotoRepository.save(placePhoto);

		placeRepository.save(savePlace);
		resultResponseDto.setResult(true);
		return resultResponseDto;
	}

}
