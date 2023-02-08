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
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.service.Library.LibraryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/librarys")
public class LibraryController {
	private final LibraryService libraryService;

	@GetMapping("{memberId}/report")
	public List<BookReportDto> viewBookReportList(@PathVariable Long userId) {
		return libraryService.viewBookReportList(userId);
	}

	@PostMapping("{memberId}/report")
	public ResultResponseDto makeBookReport(@ModelAttribute BookReportDto requestDto) {
		return libraryService.makeBookReport(requestDto);
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
