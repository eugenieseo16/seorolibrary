package com.seoro.seoro.repository.Book;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seoro.seoro.domain.entity.Book.BookReport;
import com.seoro.seoro.domain.entity.Book.BookReportPhoto;

public interface BookReportPhotoRepository extends JpaRepository<BookReportPhoto, Long> {
	Optional<BookReportPhoto> findByBookReport(BookReport bookReport);
}
