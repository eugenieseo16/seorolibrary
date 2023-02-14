package com.seoro.seoro.repository.Book;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seoro.seoro.domain.entity.Book.OwnBook;
import com.seoro.seoro.domain.entity.Member.Member;

import io.lettuce.core.dynamic.annotation.Param;

public interface OwnBookRepository extends JpaRepository<OwnBook, Long> {
	Long countByMember(Member member);
//	Optional<OwnBook> findByIsbn(String isbn);
	List<OwnBook> findByIsbn(String isbn);

	Optional<OwnBook> findByMemberAndIsbn(Member member, String isbn);

	// List findByBook_Isbn(@Param(value= "isbn") String isbn);
}