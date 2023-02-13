package com.seoro.seoro.service.Book;

import java.io.IOException;
import java.util.List;

import org.json.simple.parser.ParseException;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Book.BookDetailDto;
import com.seoro.seoro.domain.dto.Book.OwnBookDetailDto;
import com.seoro.seoro.domain.dto.Book.OwnBookDto;
import com.seoro.seoro.domain.dto.Book.OwnCommentDetailDto;
import com.seoro.seoro.domain.dto.Book.ShowBookDto;
import com.seoro.seoro.domain.dto.Book.ReviewDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;

@Service
public interface BookService {
	// List<BookDto> findBook(String input);
	// List<BookDto> findAllBooks();
	// List<BookDto> findByBookTitleLikeOrBookAuthorLike(String input1, String input2);

	public ReviewDto findReviewByIsbnAndMemberId(String isbn);

	public List findBook(String input) throws IOException, ParseException;

	public BookDetailDto viewBookDetail(String isbn) throws IOException, ParseException;
	public OwnBookDetailDto viewOwnBookDetail(String isbn, Long memberId, List<OwnBookDto> myOwnBooks) throws IOException, ParseException;

	public List findBestSeller() throws IOException;

	public ResultResponseDto makeReview(String isbn, ReviewDto requestDto);

	ResultResponseDto changeReview(String isbn, ReviewDto requestDto);

	ResultResponseDto deleteReview(String isbn, ReviewDto requestDto);

	public List findBookByDong(Long memberId);
	public List<OwnCommentDetailDto> viewOwnCommentList(String isbn);
	public OwnCommentDetailDto modifyownComment(String isbn, OwnCommentDetailDto ownCommentDetailDto);
}
