// package com.seoro.seoro.service.Library;
//
// import org.springframework.stereotype.Service;
//
// import com.seoro.seoro.domain.dto.Book.Book.OwnBookDto;
// import com.seoro.seoro.domain.dto.Library.BookReportDto;
// import com.seoro.seoro.domain.dto.Library.LibraryMainResponseDto;
// import com.seoro.seoro.domain.dto.Library.ReviewDto;
// import com.seoro.seoro.domain.dto.ResultResponseDto;
// import com.seoro.seoro.domain.dto.User.UserProfileDto;
// import com.seoro.seoro.domain.entity.Book.OwnBook;
//
// @Service
// public interface LibraryService {
// 	// 조회 관련
// 	public LibraryMainResponseDto libraryMain(Long userId);
//
// 	// 프로필 관련
// 	public ResultResponseDto modifyUserProfile(UserProfileDto requestDto);
// 	public ResultResponseDto remeveUser(Long userId);
//
// 	// 한줄평 관련
// 	public ResultResponseDto modifyOwnComment(OwnBook requestDto);
//
// 	// 리뷰 관련
// 	public ResultResponseDto modifyReview(ReviewDto requestDto);
// 	public ResultResponseDto removeReview(Long reviewId);
//
// 	// 보유도서 관련
// 	public ResultResponseDto makeOwnBook(OwnBookDto requestDto);
// 	public ResultResponseDto removeOwnBook(Long ownBookId);
//
// 	// 독서록 관련
// 	public ResultResponseDto makeBookReport(BookReportDto requestDto);
// 	public ResultResponseDto modifyBookReport(BookReportDto requestDto);
// 	public ResultResponseDto removeBookReport(Long bookReportId);
// }
