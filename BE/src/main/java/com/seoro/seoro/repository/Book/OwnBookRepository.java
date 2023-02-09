package com.seoro.seoro.repository.Book;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seoro.seoro.domain.entity.Book.OwnBook;
import com.seoro.seoro.domain.entity.Member.Member;

public interface OwnBookRepository extends JpaRepository<OwnBook, Integer> {
	Long countByMember(Member member);
	// List findByBook_Isbn(@Param(value= "isbn") String isbn);
}