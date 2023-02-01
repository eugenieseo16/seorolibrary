package com.seoro.seoro.service.Book;

import java.util.List;

import com.seoro.seoro.domain.dto.BookDto;
public interface BookService {

	String exercise();
	List<BookDto> findAllBooks();
}
