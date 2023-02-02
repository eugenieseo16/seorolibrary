package com.seoro.seoro.repository.Book;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.seoro.seoro.domain.entity.Book.Book;


public interface BookRepository extends JpaRepository<Book, String> {
	List<Book> findByIsbn(String isbn);
	List<Book> findByBookTitleLikeOrBookAuthorLike(String input1, String input2);
}