package com.seoro.seoro.service.Book;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;

import com.seoro.seoro.domain.dto.Book.*;
import org.json.simple.parser.ParseException;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Member.MemberDto;
import com.seoro.seoro.domain.dto.Member.MemberShowDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;

@Service
public interface BookService {
	// List<BookDto> findBook(String input);
	// List<BookDto> findAllBooks();
	// List<BookDto> findByBookTitleLikeOrBookAuthorLike(String input1, String input2);

	public ReviewDto findReviewByIsbnAndMemberId(String isbn);

	public List findBook(String input) throws IOException, ParseException, URISyntaxException;

	public BookDetailDto viewBookDetail(String isbn, Long memberId) throws ParseException, URISyntaxException;
	public OwnBookDetailDto viewOwnBookDetail(String isbn, Long memberId, List<OwnBookDto> myOwnBooks) throws
		IOException,
		ParseException,
		URISyntaxException;

	public OwnBookDetailDto viewOwnBookDetail(String memberName, String isbn) throws ParseException, URISyntaxException;

	public List findBestSeller() throws IOException;

	public ResultResponseDto makeReview(String isbn, ReviewDto requestDto);

	ResultResponseDto changeReview(String isbn, ReviewUpdateDto requestDto);

	ResultResponseDto deleteReview(String isbn, Long reviewId);

	public List findBookByDong(Long memberId);
	public List<OwnCommentDetailDto> viewOwnCommentList(String isbn);
	public OwnCommentDetailDto modifyownComment(String isbn, OwnCommentDetailDto ownCommentDetailDto);

    public BookReviewResponseDto viewBookReview(String isbn);

	public BookCommentResponseDto viewBookComment(String isbn);

	ResultResponseDto addReadBook(String isbn, Map<String,String> request);

	List<MemberShowDto> showReader(String isbn);
}
