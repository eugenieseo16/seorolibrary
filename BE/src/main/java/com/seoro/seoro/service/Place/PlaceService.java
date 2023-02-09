package com.seoro.seoro.service.Place;

import java.io.IOException;
import java.util.List;

import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Book.BookDto;
import com.seoro.seoro.domain.dto.Book.ReviewDto;
import com.seoro.seoro.domain.dto.Place.PlaceDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;

@Service
public interface PlaceService {
	// List<BookDto> findBook(String input);
	// List<BookDto> findAllBooks();
	// List<BookDto> findByBookTitleLikeOrBookAuthorLike(String input1, String input2);

	// ReviewDto findReviewByIsbnAndMemberId(String isbn);
	//
	// List findBook(String input) throws IOException, ParseException;
	//
	// BookDto findByIsbn(String isbn) throws IOException, ParseException;
	//
	// List findBestSeller() throws IOException;
	//
	// ResultResponseDto makeReview(String isbn, ReviewDto requestDto);

	List<PlaceDto> findAllPlaces();

	List<PlaceDto> findMyPlaces();

}
