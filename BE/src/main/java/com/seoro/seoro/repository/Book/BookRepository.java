package com.seoro.seoro.repository.Book;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, String> {
	Book findByIsbn(String isbn);
	List<Book> findByBookTitleLikeOrBookAuthorLike(String input1, String input2);
}