package com.seoro.seoro.service.Book;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Book.BookDto;
import com.seoro.seoro.domain.entity.Book.Book;
import com.seoro.seoro.repository.book.BookRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
	private BookRepository bookRepository;

	@Autowired
	public BookServiceImpl(BookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}

	@Override
	public List<BookDto> findAllBooks() {
		List<Book> list = bookRepository.findAll();
		List<BookDto> dtoList = new ArrayList<>();
		for(Book book: list){
			dtoList.add(BookDto.builder()
					.isbn(book.getIsbn())
					.bookTitle(book.getBookTitle())
					.bookAuthor(book.getBookAuthor())
					.bookPublisher(book.getBookPublisher())
					.bookImage(book.getBookImage())
					.bookDescrib(book.getBookDescrib())
					.bookPubDate(book.getBookPubDate())
					.bookPage(book.getBookPage())
					.build());
		}
		return dtoList;
	}

	@Override
	public List<BookDto> findByIsbn(String isbn) {
		List<Book> list = bookRepository.findByIsbn(isbn);
		List<BookDto> dtoList = new ArrayList<>();
		for(Book book: list){
			dtoList.add(BookDto.builder()
				.isbn(book.getIsbn())
				.bookTitle(book.getBookTitle())
				.bookAuthor(book.getBookAuthor())
				.bookPublisher(book.getBookPublisher())
				.bookImage(book.getBookImage())
				.bookDescrib(book.getBookDescrib())
				.bookPubDate(book.getBookPubDate())
				.bookPage(book.getBookPage())
				.build());
		}
		return dtoList;
	}

	@Override
	public List<BookDto> findByBookTitleLikeOrBookAuthorLike(String input1, String input2) {
		List<Book> list = bookRepository.findByBookTitleLikeOrBookAuthorLike(input1, input2);
		List<BookDto> dtoList = new ArrayList<>();
		for(Book book: list){
			dtoList.add(BookDto.builder()
				.isbn(book.getIsbn())
				.bookTitle(book.getBookTitle())
				.bookAuthor(book.getBookAuthor())
				.bookPublisher(book.getBookPublisher())
				.bookImage(book.getBookImage())
				.bookDescrib(book.getBookDescrib())
				.bookPubDate(book.getBookPubDate())
				.bookPage(book.getBookPage())
				.build());
		}
		return dtoList;
	}
}
