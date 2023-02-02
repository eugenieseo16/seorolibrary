package com.seoro.seoro.service.Book;

import java.util.List;

import com.seoro.seoro.domain.dto.Book.BookDto;
public interface BookService {

	List<BookDto> findAllBooks();
	List<BookDto> findByIsbn(String isbn);
}
