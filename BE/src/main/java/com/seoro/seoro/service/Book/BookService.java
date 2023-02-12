package com.seoro.seoro.service.Book;

import java.io.IOException;
import java.util.List;

import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Book.BookDetailDto;
import com.seoro.seoro.domain.dto.Book.OwnBookDetailDto;
import com.seoro.seoro.domain.dto.Book.ShowBookDto;
import com.seoro.seoro.domain.dto.Book.ReviewDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;

@Service
public interface BookService {
	// List<BookDto> findBook(String input);
	// List<BookDto> findAllBooks();
	// List<BookDto> findByBookTitleLikeOrBookAuthorLike(String input1, String input2);

	ReviewDto findReviewByIsbnAndMemberId(String isbn);

	List findBook(String input) throws IOException, ParseException;

	BookDetailDto viewBookDetail(String isbn) throws IOException, ParseException;

	List findBestSeller() throws IOException;

	ResultResponseDto makeReview(String isbn, ReviewDto requestDto);

	List findBookByDong(Long memberId);
	// 도서 상세
	public OwnBookDetailDto viewOwnBookDetail(String isbn) throws IOException, ParseException;
}
