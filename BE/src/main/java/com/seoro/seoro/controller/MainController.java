package com.seoro.seoro.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoro.seoro.domain.dto.Book.BookDto;
import com.seoro.seoro.service.Book.BookService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/main")
public class MainController {

	private final BookService bookService;

	@GetMapping("/search/{input}")
	public List<BookDto>[] searchByInput(@PathVariable String input){
		List<BookDto>[] result = new ArrayList[2];
		result[0]= bookService.findByBookTitleLikeOrBookAuthorLike("%"+input+"%","%"+input+"%");
		result[1] = new ArrayList<>();
		// result[1]= userService.findByUserId(input);
		return result;
	}

	@GetMapping("/best")
	public String findBestSeller() throws IOException {
		return bookService.findBestSeller();
	}
}
