package com.seoro.seoro.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoro.seoro.domain.dto.Book.BookDto;
import com.seoro.seoro.domain.dto.Book.ReviewDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.service.Book.BookService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
public class BookController {

	private final BookService bookService;

	@GetMapping("/review/{isbn}")
	public List<ReviewDto> searchReviewsByIsbn(@PathVariable String isbn){
		List<ReviewDto> reviews = new ArrayList<>();
		reviews= bookService.findReviewByIsbn(isbn);
		return reviews;
	}

	@PostMapping("/review/{isbn}")
	public ResultResponseDto makeReview(@PathVariable("isbn") String isbn, @ModelAttribute ReviewDto requestDto){
		return bookService.makeReview(requestDto);
	}

	@GetMapping("/detail/{isbn}")
	public BookDto findByIsbn(@PathVariable String isbn){
		return bookService.findByIsbn(isbn);
	}

	@GetMapping("/detail/all")
	public List<BookDto> findAllBooks(){
		return bookService.findAllBooks();
	}

	@GetMapping("/best")
	public String findBestSeller() throws IOException {
		return bookService.findBestSeller();
	}
}
