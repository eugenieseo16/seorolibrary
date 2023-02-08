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
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Book.BookDto;
import com.seoro.seoro.domain.dto.Book.ReviewDto;
import com.seoro.seoro.domain.dto.Place.PlaceDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.domain.entity.Book.Review;
import com.seoro.seoro.domain.entity.Member.Member;
import com.seoro.seoro.domain.entity.Place.Place;
import com.seoro.seoro.repository.Book.ReadBookRepository;
import com.seoro.seoro.repository.Book.ReviewRepository;
import com.seoro.seoro.repository.Place.PlaceRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlaceServiceImpl implements PlaceService {

	final PlaceRepository placeRepository;

	@Override
	public List<PlaceDto> findAllPlaces() {
		List<Place> list = placeRepository.findAll();
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

}
