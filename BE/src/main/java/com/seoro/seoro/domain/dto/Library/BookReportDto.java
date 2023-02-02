package com.seoro.seoro.domain.dto.Library;

import java.util.ArrayList;
import java.util.List;

import com.seoro.seoro.domain.entity.Book.BookReportPhoto;
import com.seoro.seoro.domain.entity.Book.ReadBook;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BookReportDto {
	private Long bookReportId;
	private Long readBookId;
	private String bookReportContent;
	//private List<BookReportPhoto> photos = new ArrayList<>();
}
