package com.seoro.seoro.service.Library;

import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Book.BookReportDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;

@Service
public interface LibraryService {
	// 독서록 관련
	public ResultResponseDto makeBookReport(BookReportDto requestDto);
	public BookReportDto viewBookReport(Long bookReportId);
	public ResultResponseDto modifyBookReport(BookReportDto requestDto, Long bookReportId);
	public ResultResponseDto removeBookReport(Long bookReportId);
}
