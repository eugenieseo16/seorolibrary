package com.seoro.seoro.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.seoro.seoro.domain.dto.Book.BookDetailDto;
import com.seoro.seoro.domain.dto.Book.BookReportDto;
import com.seoro.seoro.domain.dto.Book.OwnBookDto;
import com.seoro.seoro.domain.dto.Book.OwnCommentDto;
import com.seoro.seoro.domain.dto.Book.ReviewDto;
import com.seoro.seoro.domain.dto.Group.GroupShowDto;
import com.seoro.seoro.domain.dto.Library.LibraryDto;
import com.seoro.seoro.domain.dto.Member.FriendDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.service.Library.LibraryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/librarys")
public class LibraryController {
	private final LibraryService libraryService;

	@GetMapping ("/{memberId}")
	public LibraryDto libraryMain(@PathVariable Long memberId, @RequestParam("memberId") Long meId) {
		return libraryService.libraryMain(memberId, meId);
	}

	@DeleteMapping("/{memberId}/own/{isbn}")
	public ResultResponseDto removeOwnBook(@PathVariable Long memberId, @PathVariable String isbn) {
		return libraryService.removeOwnBook(memberId, isbn);
	}

	@DeleteMapping("/{memberId}/read/{isbn}")
	public ResultResponseDto removeReadBook(@PathVariable Long memberId, @PathVariable String isbn) {
		return libraryService.removeReadBook(memberId, isbn);
	}

	@GetMapping("/{memberId}/groups")
	public List<GroupShowDto> viewMyGroup(@PathVariable Long memberId) {
		return libraryService.viewMyGroup(memberId);
	}

	@PostMapping("/{memberId}")
	public ResultResponseDto makeOwnBook(@PathVariable Long memberId, @RequestBody OwnBookDto requestDto) {
		return libraryService.makeOwnBook(memberId, requestDto);
	}

	@GetMapping("/{memberId}/comments")
	public List<OwnCommentDto> viewMyComment(@PathVariable Long memberId) {
		return libraryService.viewMyComment(memberId);
	}

	@GetMapping("/{memberId}/reviews")
	public List<ReviewDto> viewMyReview(@PathVariable Long memberId) {
		return libraryService.viewMyReview(memberId);
	}

	// 확인
	@GetMapping("{memberId}/report")
	public List<BookReportDto> viewBookReportList(@PathVariable Long memberId) {
		return libraryService.viewBookReportList(memberId);
	}

	@PostMapping("{memberId}/report")
	public ResultResponseDto makeBookReport(@RequestBody BookReportDto requestDto, @PathVariable Long memberId) {
		return libraryService.makeBookReport(requestDto, memberId);
	}

	// @GetMapping("{memberId}/report/{bookReportId}")
	// public BookReportDto viewBookReport(@PathVariable Long bookReportId) {
	// 	return libraryService.viewBookReport(bookReportId);
	// }

	@PutMapping("{memberId}/report")
	public ResultResponseDto modifyBookReport(@RequestBody BookReportDto requestDto) {
		return libraryService.modifyBookReport(requestDto);
	}

	@DeleteMapping("{bookReportId}/report")
	public ResultResponseDto removeBookReport(@PathVariable Long bookReportId) {
		return libraryService.removeBookReport(bookReportId);
	}

	@PostMapping("/{memberId}/friends")
	public LibraryDto makeFriend(@PathVariable Long memberId, @RequestBody Map<String, Long> json) {
		return libraryService.makeFriend(memberId, json.get("memberId"));
	}

	// @DeleteMapping("/{memberId}/friends")
	// public LibraryDto removeFriend(@PathVariable Long memberId, @RequestParam("memberId") Long meId) {
	// 	return libraryService.removeFriend(memberId, meId);
	// }

	@GetMapping("/{memberId}/friends")
	public List<FriendDto> viewFriendList(@PathVariable Long memberId) {
		return libraryService.viewFriendList(memberId);
	}
}
