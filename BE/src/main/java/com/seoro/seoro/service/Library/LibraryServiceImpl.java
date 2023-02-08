package com.seoro.seoro.service.Library;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Book.BookReportDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.domain.entity.Book.BookReport;
import com.seoro.seoro.domain.entity.Book.ReadBook;
import com.seoro.seoro.domain.entity.Member.Member;
import com.seoro.seoro.repository.Book.BookReportRepository;
import com.seoro.seoro.repository.Book.ReadBookRepository;
import com.seoro.seoro.repository.Member.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class LibraryServiceImpl implements LibraryService {
	private final BookReportRepository bookReportRepository;
	private final ReadBookRepository readBookRepository;
	private final MemberRepository memberRepository;

	@Override
	public List<BookReportDto> viewBookReportList(Long memberId) {
		List<BookReportDto> bookReportList = bookReportRepository.findBookReportsByMemberId(memberId);
		return bookReportList;
	}

	@Override
	public ResultResponseDto makeBookReport(BookReportDto requestDto, Long memberId) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();

		BookReport bookReport = new BookReport();
		ReadBook readBook = new ReadBook();
		readBook = readBookRepository.findByReadBookId(requestDto.getReadBookId()).get();
		Member nowMember = memberRepository.findById(memberId).get();

		// 이미지 저장 추가

		bookReport = BookReport.builder()
			.readBook(readBook)
			.member(nowMember)
			.bookReportTitle(requestDto.getBookReportTitle())
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
			(responseBookReport.getReadBook().getReadBookId(), responseBookReport.getBookReportTitle(), responseBookReport.getBookReportContent());

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
				.bookReportTitle(requestDto.getBookReportTitle())
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
