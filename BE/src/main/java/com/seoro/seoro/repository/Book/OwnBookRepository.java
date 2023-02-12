package com.seoro.seoro.repository.Book;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seoro.seoro.domain.entity.Book.OwnBook;
import com.seoro.seoro.domain.entity.Member.Member;

public interface OwnBookRepository extends JpaRepository<OwnBook, Long> {
	Long countByMember(Member member);
	Optional<OwnBook> findByIsbn(String isbn);
	// List findByBook_Isbn(@Param(value= "isbn") String isbn);
}