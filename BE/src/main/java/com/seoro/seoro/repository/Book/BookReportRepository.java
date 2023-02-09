package com.seoro.seoro.repository.Book;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seoro.seoro.domain.dto.Book.BookReportDto;
import com.seoro.seoro.domain.entity.Book.BookReport;

public interface BookReportRepository extends JpaRepository<BookReport, Long> {
	List<BookReportDto> findBookReportsByMemberId(Long memberId);
}
