package com.seoro.seoro.domain.dto.Book;

import com.seoro.seoro.domain.entity.Book.BookReport;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookReportDto {
	private boolean result;
	private Long bookReportId;
	private Long readBookId;
	private String bookReportTitle;
	private String bookReportContent;
	private String photo;

	public BookReportDto(BookReport bookReport) {
		this.result = true;
		this.bookReportId = bookReport.getBookReportId();
		this.readBookId = bookReport.getBookReportId();
		this.bookReportTitle = bookReport.getBookReportTitle();
		this.bookReportContent = bookReport.getBookReportContent();
	}
}
