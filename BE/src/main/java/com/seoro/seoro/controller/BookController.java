package com.seoro.seoro.controller;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;

import com.seoro.seoro.domain.dto.Book.*;
import org.json.simple.parser.ParseException;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoro.seoro.domain.dto.Member.MemberDto;
import com.seoro.seoro.domain.dto.Member.MemberShowDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.service.Book.BookService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
public class BookController {

	private final BookService bookService;

	//검색 결과 상세
	@GetMapping("/detail/{isbn}")
	public BookDetailDto viewBookDetail(@PathVariable String isbn, @ModelAttribute BookRequestDto requestDto) throws
		ParseException,
		URISyntaxException {
		return bookService.viewBookDetail(isbn,requestDto.getMemberId());
	}

	//읽은 도서 추가
	@PostMapping("/detail/{isbn}")
	public ResultResponseDto addReadBook(@PathVariable("isbn") String isbn, @RequestBody Map<String, String> request){
		return bookService.addReadBook(isbn,request);
	}

	//도서 리뷰 작성
	@PostMapping("/review/{isbn}")
	public ResultResponseDto makeReview(@PathVariable("isbn") String isbn, @RequestBody ReviewDto requestDto){
		return bookService.makeReview(isbn, requestDto);
	}

	//도서 리뷰 수정
	@PutMapping("/review/{isbn}")
	public ResultResponseDto changeReview(@PathVariable("isbn") String isbn, @RequestBody ReviewUpdateDto requestDto){
		return bookService.changeReview(isbn, requestDto);
	}

	//도서 리뷰 삭제
	@DeleteMapping("/review/{isbn}/{reviewid}")
	public ResultResponseDto deleteReview(@PathVariable("isbn") String isbn,
		@PathVariable("reviewid") Long reviewId){
		return bookService.deleteReview(isbn, reviewId);
	}

	// 리뷰
	@GetMapping("/detail/review/{isbn}")
	public BookReviewResponseDto viewBookReview(@PathVariable("isbn") String isbn) {
		return bookService.viewBookReview(isbn);
	}

	// 한줄평
	@GetMapping("/detail/comment/{isbn}")
	public BookCommentResponseDto viewBookComment(@PathVariable("isbn") String isbn) {
		return bookService.viewBookComment(isbn);
	}

	@GetMapping("/readpeople/{isbn}")
	public List<MemberShowDto> showReader(@PathVariable("isbn") String isbn){
		return bookService.showReader(isbn);
	}
}
