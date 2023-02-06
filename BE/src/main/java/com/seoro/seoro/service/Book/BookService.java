package com.seoro.seoro.service.Book;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Book.BookDto;
import com.seoro.seoro.domain.dto.Book.ReviewDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;

@Service
public interface BookService {
	// List<BookDto> findBook(String input);
	// List<BookDto> findAllBooks();
	// BookDto findByIsbn(String isbn);
	// List<ReviewDto> findReviewByIsbn(String isbn);

	// List<BookDto> findByBookTitleLikeOrBookAuthorLike(String input1, String input2);
	List findBestSeller() throws IOException;

	List findBook(String input) throws IOException, ParseException;

	// ResultResponseDto makeReview(ReviewDto requestDto);
}
