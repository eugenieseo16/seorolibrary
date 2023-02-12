package com.seoro.seoro.controller;

import java.io.IOException;

import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoro.seoro.domain.dto.Book.BookDetailDto;
import com.seoro.seoro.domain.dto.Book.ReviewDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.service.Book.BookService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
public class BookController {

	private final BookService bookService;

	@GetMapping("/detail/{isbn}")
	public BookDetailDto viewBookDetail(@PathVariable String isbn) throws IOException, ParseException {
		return bookService.viewBookDetail(isbn);
	}

	@GetMapping("/review/{isbn}")
	public ReviewDto searchReviewsByIsbn(@PathVariable String isbn){
		ReviewDto review = bookService.findReviewByIsbnAndMemberId(isbn);
		return review;
	}

	@PostMapping("/review/{isbn}")
	public ResultResponseDto makeReview(@PathVariable("isbn") String isbn, @ModelAttribute ReviewDto requestDto){
		return bookService.makeReview(isbn, requestDto);
	}
}
