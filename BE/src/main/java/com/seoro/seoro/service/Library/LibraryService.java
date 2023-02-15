package com.seoro.seoro.service.Library;

import java.io.IOException;
import java.util.List;

import org.json.simple.parser.ParseException;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.seoro.seoro.domain.dto.Book.BookDetailDto;
import com.seoro.seoro.domain.dto.Book.BookReportDto;
import com.seoro.seoro.domain.dto.Book.OwnBookDetailDto;
import com.seoro.seoro.domain.dto.Book.OwnBookDto;
import com.seoro.seoro.domain.dto.Book.OwnCommentDto;
import com.seoro.seoro.domain.dto.Book.ReadBookDto;
import com.seoro.seoro.domain.dto.Book.ReviewDto;
import com.seoro.seoro.domain.dto.Group.GroupShowDto;
import com.seoro.seoro.domain.dto.Library.LibraryDto;
import com.seoro.seoro.domain.dto.Member.FriendDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;

@Service
public interface LibraryService {
	public LibraryDto libraryMain(Long memberId, Long meId);
	public List<OwnBookDto> viewMyOwnBook(Long memberId);
	public List<ReadBookDto> viewMyReadBook(Long memberId);
	public List<GroupShowDto> viewMyGroup(Long memberId);
	public ResultResponseDto makeOwnBook(Long memberId, OwnBookDto ownBookDto);
	public ResultResponseDto removeOwnBook(Long memberId, String isbn);
	public ResultResponseDto removeReadBook(Long memberId, String isbn);
	public List<OwnCommentDto> viewMyComment(Long memberId);
	public List<ReviewDto> viewMyReview(Long memberId);
	public List<BookReportDto> viewBookReportList(Long memberId);
	public ResultResponseDto makeBookReport(BookReportDto requestDto, Long memberId);
	public BookReportDto viewBookReport(Long bookReportId);
	public ResultResponseDto modifyBookReport(BookReportDto requestDto);
	public ResultResponseDto removeBookReport(Long bookReportId);
	public ResultResponseDto makeFriend(Long memberId, Long meId);
	public ResultResponseDto removeFriend(Long memberId, Long meId);
	public List<FriendDto> viewFollowingList(Long memberId);

	public List<FriendDto> viewFollowerList(Long memberId);
}
