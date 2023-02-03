package com.seoro.seoro.service.Library;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Book.BookReportDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.domain.entity.Book.BookReport;
import com.seoro.seoro.domain.entity.Book.ReadBook;
import com.seoro.seoro.repository.Book.BookReportRepository;
import com.seoro.seoro.repository.Book.ReadBookRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class LibraryServiceImpl implements LibraryService {
	private final BookReportRepository bookReportRepository;
	private final ReadBookRepository readBookRepository;

	@Override
	public List<BookReportDto> viewBookReportList(Long userId) {
		List<BookReportDto> bookReportList = new ArrayList<>();
		
		// query dsl 사용해서 readBook이랑 bookReport join하여 전체 조회
		
		return null;
	}

	@Override
	public ResultResponseDto makeBookReport(BookReportDto requestDto) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();

		BookReport bookReport = new BookReport();
		ReadBook readBook = new ReadBook();
		readBook = readBookRepository.findByReadBookId(requestDto.getReadBookId());

		// 이미지 저장 추가
		bookReport = BookReport.builder()
			.readBook(readBook)
			.bookReportContent(requestDto.getBookReportContent())
			.build();

		bookReportRepository.save(bookReport);
		resultResponseDto.setResult(true);

		return resultResponseDto;
	}

	@Override
	public BookReportDto viewBookReport(Long bookReportId) {
		Optional<BookReport> bookReport = bookReportRepository.findById(bookReportId);
		BookReport responseBookReport = bookReport.get();

		BookReportDto responsetDto = new BookReportDto
			(responseBookReport.getReadBook().getReadBookId(), responseBookReport.getBookReportContent());

		return responsetDto;
	}

	@Override
	public ResultResponseDto modifyBookReport(BookReportDto requestDto, Long bookReportId) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();

		Optional<BookReport> bookReport = bookReportRepository.findById(bookReportId);
		if(bookReport.isPresent()) {
			BookReport newBookReport = bookReport.get();

			// 이미지 수정 추가
			newBookReport = BookReport.builder()
				.bookReportId(bookReportId)
				.readBook(newBookReport.getReadBook())
				.bookReportContent(requestDto.getBookReportContent())
				.build();

			bookReportRepository.save(newBookReport);
			resultResponseDto.setResult(true);
		}

		return resultResponseDto;
	}

	@Override
	public ResultResponseDto removeBookReport(Long bookReportId) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();

		Optional<BookReport> bookReport = bookReportRepository.findById(bookReportId);
		if(bookReport.isPresent()) {
			bookReportRepository.delete(bookReport.get());
			resultResponseDto.setResult(true);
		}

		return resultResponseDto;
	}
}
