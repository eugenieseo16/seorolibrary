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
// import com.seoro.seoro.service.User.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/main")
public class MainController {

	private final BookService bookService;
	// private final UserService userService;
	//
	// @GetMapping("/search/{input}")
	// public List<List> searchByInput(@PathVariable String input){
	// 	List<List> result = new ArrayList<>();
	// 	result.add(bookService.findBook);
	// 	result.add(userService.findByUserNameLike("%"+input+"%"));
	// 	return result;
	// }

	@GetMapping("/best")
	public List findBestSeller() throws IOException {
		return bookService.findBestSeller();
	}
}
