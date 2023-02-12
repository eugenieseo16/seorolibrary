package com.seoro.seoro.service.Library;

import java.io.IOException;
import java.util.List;

import org.json.simple.parser.ParseException;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Book.BookDetailDto;
import com.seoro.seoro.domain.dto.Book.BookReportDto;
import com.seoro.seoro.domain.dto.Book.OwnBookDetailDto;
import com.seoro.seoro.domain.dto.Book.OwnBookDto;
import com.seoro.seoro.domain.dto.Book.OwnCommentDto;
import com.seoro.seoro.domain.dto.Book.ReviewDto;
import com.seoro.seoro.domain.dto.Group.GroupShowDto;
import com.seoro.seoro.domain.dto.Library.LibraryDto;
import com.seoro.seoro.domain.dto.Member.FriendDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;

@Service
public interface LibraryService {
	public LibraryDto libraryMain(Long memberId, User user);
	public List<GroupShowDto> viewMyGroup(Long memberId);
	public ResultResponseDto makeOwnBook(Long memberId, BookDetailDto bookDetailDto);
	public ResultResponseDto removeOwnBook(Long memberId, String isbn);
	public ResultResponseDto removeReadBook(Long memberId, String isbn);
	public List<OwnCommentDto> viewMyComment(Long memberId);
	public List<ReviewDto> viewMyReview(Long memberId);
	public List<BookReportDto> viewBookReportList(Long memberId);
	public ResultResponseDto makeBookReport(BookReportDto requestDto, Long memberId);
	public BookReportDto viewBookReport(Long bookReportId);
	public ResultResponseDto modifyBookReport(BookReportDto requestDto, Long bookReportId);
	public ResultResponseDto removeBookReport(Long bookReportId);
	public LibraryDto makeFriend(Long memberId, User user);
	public LibraryDto removeFriend(Long memberId, User user);
	public List<FriendDto> viewFriendList(Long memberId);
}
