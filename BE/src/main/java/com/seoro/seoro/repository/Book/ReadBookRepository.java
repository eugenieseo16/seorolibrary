package com.seoro.seoro.repository.Book;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seoro.seoro.domain.entity.Book.ReadBook;
import com.seoro.seoro.domain.entity.Member.Member;

public interface ReadBookRepository extends JpaRepository<ReadBook, Long> {
	Optional<ReadBook> findByIsbn(String isbn);
	Long countByIsbn(String isbn);
	Optional<ReadBook> findByReadBookId(Long readBookId);
	Long countByMember(Member member);
}
