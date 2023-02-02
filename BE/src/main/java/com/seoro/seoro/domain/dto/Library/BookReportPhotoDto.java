package com.seoro.seoro.domain.dto.Library;

import com.seoro.seoro.domain.entity.Book.BookReport;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BookReportPhotoDto {
	private Long bookReportPhotoId;
	private Long bookReportId;
	private String photo;
}
