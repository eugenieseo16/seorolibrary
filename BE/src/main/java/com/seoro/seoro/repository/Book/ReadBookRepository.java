package com.seoro.seoro.repository.Book;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seoro.seoro.domain.entity.Book.ReadBook;

public interface ReadBookRepository extends JpaRepository<ReadBook, Long> {
	ReadBook findByIsbn(String isbn);

	ReadBook findByReadBookId(Long readBookId);
}
