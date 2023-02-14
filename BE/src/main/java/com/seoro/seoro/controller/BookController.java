package com.seoro.seoro.controller;

import java.io.IOException;
import java.util.List;

import com.seoro.seoro.domain.dto.Book.*;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.service.Book.BookService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
public class BookController {

	private final BookService bookService;

	//검색 -> 도서상세정보
	@GetMapping("/detail/{isbn}")
	public BookDetailDto viewBookDetail(@PathVariable String isbn) throws IOException, ParseException {
		return bookService.viewBookDetail(isbn);
	}

	//도서 리뷰 작성
	@PostMapping("/review/{isbn}")
	public ResultResponseDto makeReview(@PathVariable("isbn") String isbn, @RequestBody ReviewDto requestDto){
		return bookService.makeReview(isbn, requestDto);
	}

	//도서 리뷰 수정
	@PutMapping("/review/{isbn}")
	public ResultResponseDto changeReview(@PathVariable("isbn") String isbn, @ModelAttribute ReviewDto requestDto){
		return bookService.changeReview(isbn, requestDto);
	}

	//도서 리뷰 삭제
	@DeleteMapping("/review/{isbn}")
	public ResultResponseDto deleteReview(@PathVariable("isbn") String isbn, @ModelAttribute ReviewDto requestDto){
		return bookService.deleteReview(isbn, requestDto);
	}

	//도서 리뷰 작성 잘되었는지 확인하려고 만듬.. 삭제해야됨
	@GetMapping("/review/{isbn}")
	public ReviewDto searchReviewsByIsbn(@PathVariable String isbn){
		ReviewDto review = bookService.findReviewByIsbnAndMemberId(isbn);
		return review;
	}

	// 검색 결과 상세

	// 사용자 도서 상세
	@GetMapping("/detail/{memberId}/{isbn}")
	public OwnBookDetailDto viewOwnBookDetail(
		@PathVariable("isbn") String isbn, @PathVariable("memberId") Long memberId, List<OwnBookDto> myOwnBooks)
		throws IOException, ParseException {

		return bookService.viewOwnBookDetail(isbn, memberId, myOwnBooks);
	}

	// 리뷰
	@GetMapping("detail/review/{isbn}")
	public BookReviewResponseDto viewBookReview(@PathVariable("isbn") String isbn) {
		return bookService.viewBookReview(isbn);
	}

	// 한줄평
	@GetMapping("detail/comment/{isbn}")
	public BookCommentResponseDto viewBookComment(@PathVariable("isbn") String isbn) {
		return bookService.viewBookComment(isbn);
	}
}
