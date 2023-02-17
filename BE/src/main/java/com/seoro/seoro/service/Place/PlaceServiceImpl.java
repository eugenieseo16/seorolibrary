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
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Place.PlaceAddRequestDto;
import com.seoro.seoro.domain.dto.Place.PlaceDto;
import com.seoro.seoro.domain.dto.Place.PlaceReviewAddRequestDto;
import com.seoro.seoro.domain.dto.Place.PlaceReviewDto;
import com.seoro.seoro.domain.dto.Place.PlaceShowDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.domain.entity.Member.Member;
import com.seoro.seoro.domain.entity.Place.Place;
import com.seoro.seoro.domain.entity.Place.PlacePhoto;
import com.seoro.seoro.domain.entity.Place.PlaceReview;
import com.seoro.seoro.domain.entity.Place.PlaceReviewPhoto;
import com.seoro.seoro.repository.Member.MemberRepository;
import com.seoro.seoro.repository.Place.PlacePhotoRepository;
import com.seoro.seoro.repository.Place.PlaceRepository;
import com.seoro.seoro.repository.Place.PlaceReviewPhotoRepository;
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
	final PlaceReviewPhotoRepository placeReviewPhotoRepository;

	@Override
	public List<PlaceShowDto> findAllPlaces(Long memberId) {
		System.out.println(memberId);
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
			List<String> photos = new ArrayList<>();

			for(PlacePhoto photo : place.getPhotos()){
				photos.add(photo.getPhoto());
			}

			dtoList.add(PlaceShowDto.builder()
					.placeLongitude(place.getPlaceLongitude())
					.placeLatitude(place.getPlaceLatitude())
					.placeId(place.getPlaceId())
					.placeName(place.getPlaceName())
					.score(place.getScore())
					.placePhotoList(photos)
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
			List<String> photos = new ArrayList<>();

			for(PlacePhoto photo : place.getPhotos()){
				photos.add(photo.getPhoto());
			}
			dtoList[0].add(PlaceShowDto.builder()
				.placeLongitude(place.getPlaceLongitude())
				.placeLatitude(place.getPlaceLatitude())
				.placeId(place.getPlaceId())
				.placeName(place.getPlaceName())
				.score(place.getScore())
				.placePhotoList(photos)
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
		System.out.println(body.toString());
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
			.describ(requestDto.getPlaceDescrib())
			.placeLatitude(requestDto.getLatitude())
			.placeLongitude(requestDto.getLongitude())
			.dongCode(placeDong)
			.total(0d)
			.score(0d)
			.build();

		placeRepository.save(savePlace);

		//독서 장소 사진 저장
		if(requestDto.getPlacePhoto() != null && requestDto.getPlacePhoto().length > 0) {
			for(int i=0; i<requestDto.getPlacePhoto().length; i++) {
				PlacePhoto photo = PlacePhoto.builder()
					.place(savePlace)
					.photo(requestDto.getPlacePhoto()[i])
					.build();

				placePhotoRepository.save(photo);
			}
		}

		resultResponseDto.setResult(true);
		return resultResponseDto;
	}

	@Override
	public PlaceDto placeDetail(Long placeId) {
		PlaceDto responseDto = new PlaceDto();
		Place place = new Place();
		Optional<Place> findPlace = placeRepository.findById(placeId);
		if(findPlace.isPresent()) {
			place = findPlace.get();
		} else {
			responseDto.setResult(false);
			return responseDto;
		}

		String[] placePhotoDto = new String[place.getPhotos().size()];
		for(int i=0; i< place.getPhotos().size(); i++) {
			placePhotoDto[i] = place.getPhotos().get(i).getPhoto();
		}

		List<PlaceReviewDto> reviews = new ArrayList<>();
		for(PlaceReview r : place.getReviews()) {
			List<PlaceReviewPhoto> photos = r.getPhotos();
			String[] dtoPhotos = new String[photos.size()];
			for(int i=0; i< photos.size(); i++) {
				dtoPhotos[i] = photos.get(i).getPhoto();
			}
			PlaceReviewDto dto = PlaceReviewDto.builder()
				.placeReviewId(r.getPlaceReviewId())
				.score(r.getScore())
				.memberName(r.getMember().getMemberName())
				.reviewContent(r.getReviewContent())
				.placeReviewPhotos(dtoPhotos)
				.build();
			reviews.add(dto);
		}

		responseDto = PlaceDto.builder()
			.result(true)
			.placeId(place.getPlaceId())
			.placeName(place.getPlaceName())
			.placeDescrib(place.getDescrib())
			.placeLongitude(place.getPlaceLongitude())
			.placeLatitude(place.getPlaceLatitude())
			.score(place.getScore())
			.placePhoto(placePhotoDto)
			.placeReview(reviews)
			.build();

		return responseDto;
	}

	@Override
	public ResultResponseDto makeReview(Long placeId, PlaceReviewAddRequestDto requestDto) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();
		Optional<Place> findPlace = placeRepository.findById(placeId);
		Place place = new Place();
		if(findPlace.isPresent()) {
			place = findPlace.get();
		} else {
			resultResponseDto.setResult(false);
			return resultResponseDto;
		}

		Member member = new Member();
		Optional<Member> findMember = memberRepository.findByMemberName(requestDto.getMemberName());
		if(findMember.isPresent()) {
			member = findMember.get();
			System.out.println("member = " + member.getMemberName());
		} else {
			resultResponseDto.setResult(false);
			return resultResponseDto;
		}

		//리뷰 저장
		PlaceReview placeReview = PlaceReview.builder()
			.score(requestDto.getScore())
			.member(member)
			.reviewContent(requestDto.getPlaceReview())
			.place(place)
			.build();
		placeReviewRepository.save(placeReview);

		//리뷰 사진 저장
		if(requestDto.getPlaceReviewPhotos().length > 0) {
			for(int i=0; i<requestDto.getPlaceReviewPhotos().length; i++) {
				PlaceReviewPhoto photo = PlaceReviewPhoto.builder()
					.placeReview(placeReview)
					.photo(requestDto.getPlaceReviewPhotos()[i])
					.build();
				placeReviewPhotoRepository.save(photo);
			}
		}
		
		//장소 총 score 갱신
		Long countPlaceReview = placeReviewRepository.countByPlace(place);
		Double newTotal = place.getTotal() + placeReview.getScore();
		Double newScore = newTotal/countPlaceReview;

		Place updatePlace = Place.builder()
			.placeId(place.getPlaceId())
			.placeLatitude(place.getPlaceLatitude())
			.placeLongitude(place.getPlaceLongitude())
			.describ(place.getDescrib())
			.placeName(place.getPlaceName())
			.total(newTotal)
			.score(newScore)
			.member(place.getMember())
			.build();

		placeRepository.save(updatePlace);

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
