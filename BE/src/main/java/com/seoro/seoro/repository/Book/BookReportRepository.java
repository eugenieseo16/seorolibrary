package com.seoro.seoro.repository.Book;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seoro.seoro.domain.entity.Book.BookReport;

public interface BookReportRepository extends JpaRepository<BookReport, Long> {
}
