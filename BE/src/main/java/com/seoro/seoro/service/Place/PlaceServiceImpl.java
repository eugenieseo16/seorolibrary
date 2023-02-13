package com.seoro.seoro.service.Place;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Place.PlaceAddRequestDto;
import com.seoro.seoro.domain.dto.Place.PlaceDto;
import com.seoro.seoro.domain.dto.Place.PlaceReviewAddRequestDto;
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
import org.springframework.http.HttpHeaders;
import org.springframework.web.client.RestTemplate;

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
	public List<PlaceShowDto> findAllPlaces(Long memberId) {
		List<Place> list = placeRepository.findAll();
		String myDongCode = memberRepository.findByMemberId(memberId).getMemberDongCode();
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
					.score(place.getScore())
					.build());
		}
		return dtoList;
	}

	@Override
	public List<PlaceShowDto>[] findMyPlaces(Long memberId) {
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
	public ResultResponseDto addPlace(PlaceAddRequestDto requestDto) throws
		IOException,
		URISyntaxException,
		ParseException {
		ResultResponseDto resultResponseDto = new ResultResponseDto();

		Place savePlace = new Place();
		RestTemplate rest = new RestTemplate();
		HttpHeaders headers= new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		String appkey = "KakaoAK aa8ebbcbc5acc532a0a4d5b0712afc48";
		headers.set("Authorization", appkey);
		HttpEntity<String> entity = new HttpEntity<String>("parameters",headers);

		URI uri = new URI("https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x="+requestDto.getLongitude() +"&y="+requestDto.getLatitude() +"&input_coord=WGS84");

		ResponseEntity<String> res = rest.exchange(uri, HttpMethod.GET, entity, String.class);
		JSONParser jsonParser = new JSONParser();
		JSONObject body = (JSONObject) jsonParser.parse(res.getBody().toString());
		JSONArray docu = (JSONArray) body.get("documents");

		JSONObject addr = (JSONObject)docu.get(1);
		String placeDong = addr.get("address_name").toString();

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
			.dongCode(placeDong)
			.score(0f)
			.describ(requestDto.getPlacedescrib())
			.build();

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

	@Override
	public ResultResponseDto makeReview(Long placeId, PlaceReviewAddRequestDto requestDto) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();
		PlaceReview savePlaceReview = new PlaceReview();
		Place savePlace = placeRepository.findByPlaceId(placeId);
		Member maker = new Member();
		Optional<Member> tmpUser = memberRepository.findByMemberName(requestDto.getMemberName());
		if(tmpUser.isPresent()) {
			maker = tmpUser.get();
		}else {
			System.out.println("멤버 찾기 실패");
			maker = tmpUser.orElse(null);
			resultResponseDto.setResult(false);
			return resultResponseDto;
		}
		int tempReviewSize = savePlace.getReviews().size();
		Float tmpScore = savePlace.getScore()*tempReviewSize;
		savePlaceReview = PlaceReview.builder()
			.member(maker)
			.place(savePlace)
			.score(requestDto.getScore())
			.reviewContent(requestDto.getPlacereview())
			.photos(requestDto.getPlaceReviewPhotos())
			.build();
		placeReviewRepository.save(savePlaceReview);

		savePlace = Place.builder()
			.placeId(savePlace.getPlaceId())
			.member(maker)
			.placeName(savePlace.getPlaceName())
			.placeLatitude(savePlace.getPlaceLatitude())
			.placeLongitude(savePlace.getPlaceLongitude())
			.dongCode(savePlace.getDongCode())
			.score((tmpScore+requestDto.getScore())/(tempReviewSize+1))
			.describ(savePlace.getDescrib())
			.build();
		placeRepository.save(savePlace);

		resultResponseDto.setResult(true);
		return resultResponseDto;
	}

	@Override
	public String getDong(PlaceAddRequestDto requestDto) throws ParseException, URISyntaxException {
		RestTemplate rest = new RestTemplate();
		HttpHeaders headers= new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		String appkey = "KakaoAK aa8ebbcbc5acc532a0a4d5b0712afc48";
		headers.set("Authorization", appkey);
		HttpEntity<String> entity = new HttpEntity<String>("parameters",headers);

		URI uri = new URI("https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x="+requestDto.getLongitude() +"&y="+requestDto.getLatitude() +"&input_coord=WGS84");

		ResponseEntity<String> res = rest.exchange(uri, HttpMethod.GET, entity, String.class);
		JSONParser jsonParser = new JSONParser();
		JSONObject body = (JSONObject) jsonParser.parse(res.getBody().toString());
		JSONArray docu = (JSONArray) body.get("documents");

		JSONObject addr = (JSONObject)docu.get(1);
		String placeDong = addr.get("address_name").toString();
		return placeDong;
	}

}
