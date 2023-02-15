package com.seoro.seoro.repository.Book;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seoro.seoro.domain.dto.Book.BookReportDto;
import com.seoro.seoro.domain.entity.Book.BookReport;
import com.seoro.seoro.domain.entity.Book.ReadBook;
import com.seoro.seoro.domain.entity.Member.Member;

public interface BookReportRepository extends JpaRepository<BookReport, Long> {
	Optional<BookReport> findByReadBookAndMember(ReadBook readBook, Member member);
}
