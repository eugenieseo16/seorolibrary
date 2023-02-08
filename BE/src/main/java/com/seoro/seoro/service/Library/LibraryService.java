package com.seoro.seoro.service.Library;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.seoro.seoro.domain.dto.Book.BookReportDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;

@Service
public interface LibraryService {
	// 독서록 관련
	public List<BookReportDto> viewBookReportList(Long userId);
	public ResultResponseDto makeBookReport(BookReportDto requestDto, Long memberId);
	public BookReportDto viewBookReport(Long bookReportId);
	public ResultResponseDto modifyBookReport(BookReportDto requestDto, Long bookReportId);
	public ResultResponseDto removeBookReport(Long bookReportId);
}
