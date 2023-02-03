package com.seoro.seoro.service.Book;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Book.BookDto;
@Service
public interface BookService {

	List<BookDto> findAllBooks();
	List<BookDto> findByIsbn(String isbn);

	List<BookDto> findByBookTitleLikeOrBookAuthorLike(String input1, String input2);
	String findBestSeller() throws IOException;
}
