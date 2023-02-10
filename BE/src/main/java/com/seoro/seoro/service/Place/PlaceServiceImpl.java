package com.seoro.seoro.service.Place;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Book.ReviewDto;
import com.seoro.seoro.domain.dto.Place.PlaceAddRequestDto;
import com.seoro.seoro.domain.dto.Place.PlaceDto;
import com.seoro.seoro.domain.dto.Place.PlaceReviewDto;
import com.seoro.seoro.domain.dto.Place.PlaceShowDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.domain.entity.Member.Member;
import com.seoro.seoro.domain.entity.Place.Place;
import com.seoro.seoro.domain.entity.Place.PlaceReview;
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
	public List<PlaceShowDto> findAllPlaces() {
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
		List<PlaceShowDto> dtoList = new ArrayList<>();
		for(Place place: list){
			dtoList.add(PlaceShowDto.builder()
					.placeLongitude(place.getPlaceLongitude())
					.placeLatitude(place.getPlaceLatitude())
					.placeId(place.getPlaceId())
					.placeName(place.getPlaceName())
					.build());
		}
		return dtoList;
	}

	@Override
	public List<PlaceShowDto>[] findMyPlaces() {
		Long memberId = 999L;
		List<Place> list1 = placeRepository.findByMember_MemberId(memberId);
		List<PlaceShowDto>[] dtoList = new ArrayList[2];
		dtoList[0] = new ArrayList<>();
		dtoList[1] = new ArrayList<>();
		for(Place place: list1){
			dtoList[0].add(PlaceShowDto.builder()
				.placeLongitude(place.getPlaceLongitude())
				.placeLatitude(place.getPlaceLatitude())
				.placeId(place.getPlaceId())
				.placeName(place.getPlaceName())
				.score(place.getScore())
				.build());
		}
		List<PlaceReview> list2 = placeReviewRepository.findByMember_MemberId(memberId);
		for(PlaceReview review: list2){
			dtoList[1].add(PlaceShowDto.builder()
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

	@Override
	public PlaceDto placeDetail(Long placeId) {
		Place place=placeRepository.findByPlaceId(placeId);
		List<PlaceReviewDto> reviews = new ArrayList<PlaceReviewDto>();
		for(PlaceReview review: place.getReviews()){
			reviews.add(PlaceReviewDto.builder()
					.placeReviewPhotos(review.getPhotos())
					.reviewContent(review.getReviewContent())
					.memberName(review.getMember().getMemberName())
					.score(review.getScore())
				.build());
		}
		PlaceDto outputDto = PlaceDto.builder()
			.placeReview(reviews)
			.placePhoto(place.getPhotos())
			.placeName(place.getPlaceName())
			.placeLongitude(place.getPlaceLongitude())
			.placeLatitude(place.getPlaceLatitude())
			.result(true)
			.build();
		return outputDto;
	}

}
