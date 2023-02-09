package com.seoro.seoro.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoro.seoro.domain.dto.Book.BookReportDto;
import com.seoro.seoro.domain.dto.Book.OwnCommentDto;
import com.seoro.seoro.domain.dto.Book.ReviewDto;
import com.seoro.seoro.domain.dto.Group.GroupShowDto;
import com.seoro.seoro.domain.dto.Library.LibraryDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.domain.entity.Book.Review;
import com.seoro.seoro.service.Library.LibraryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/librarys")
public class LibraryController {
	private final LibraryService libraryService;

	@GetMapping("/{memberId}")
	public LibraryDto libraryMain(@PathVariable Long memberId) {
		return libraryService.libraryMain(memberId);
	}

	@DeleteMapping("/{memberId}/own/{isbn}")
	public ResultResponseDto deleteOwnBook(@PathVariable Long memberId, @PathVariable String isbn) {
		return libraryService.deleteOwnBook(memberId, isbn);
	}

	@DeleteMapping("/{memberId}/read/{isbn}")
	public ResultResponseDto deleteReadBook(@PathVariable Long memberId, @PathVariable String isbn) {
		return libraryService.deleteReadBook(memberId, isbn);
	}

	@GetMapping("/{memberId}/groups")
	public List<GroupShowDto> viewMyGroup(@PathVariable Long memberId) {
		return libraryService.viewMyGroup(memberId);
	}

	@GetMapping("/{memberId}/comments")
	public List<OwnCommentDto> viewMyComment(@PathVariable Long memberId) {
		return libraryService.viewMyComment(memberId);
	}

	@GetMapping("/{memberId}/reviews")
	public List<ReviewDto> viewMyReview(@PathVariable Long memberId) {
		return libraryService.viewMyReview(memberId);
	}

	@GetMapping("{memberId}/report")
	public List<BookReportDto> viewBookReportList(@PathVariable Long userId) {
		return libraryService.viewBookReportList(userId);
	}

	@PostMapping("{memberId}/report")
	public ResultResponseDto makeBookReport(@ModelAttribute BookReportDto requestDto, @PathVariable Long memberId) {
		return libraryService.makeBookReport(requestDto, memberId);
	}

	@GetMapping("{memberId}/report/{bookReportId}")
	public BookReportDto viewBookReport(@PathVariable Long bookReportId) {
		return libraryService.viewBookReport(bookReportId);
	}

	@PutMapping("{memberId}/report/{bookReportId}")
	public ResultResponseDto modifyBookReport(@ModelAttribute BookReportDto reportDto, @PathVariable Long bookReportId) {
		System.out.println("bookReportId: " + bookReportId);
		return libraryService.modifyBookReport(reportDto, bookReportId);
	}

	@DeleteMapping("{memberId}/report/{bookReportId}")
	public ResultResponseDto removeBookReport(@PathVariable Long bookReportId) {
		return libraryService.removeBookReport(bookReportId);
	}
}
