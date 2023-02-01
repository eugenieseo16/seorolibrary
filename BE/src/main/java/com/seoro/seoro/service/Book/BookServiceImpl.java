package com.seoro.seoro.service.Book;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoro.seoro.domain.dto.BookDto;

@RestController
@RequestMapping("/search")
public class BookServiceImpl implements BookService {
	@Override
	public List<BookDto> findAllBooks() {
		return null;
	}
//사용자가 책등록할때 보유 테이블에 등록이 되고, 도서 검색을 하면 보유 도서테이블에 검색
	@GetMapping()
	public String exercise(){
		return "success?!";
	}

	@GetMapping("/{isbn}")
	public String bookDetail(){
		return "success";
	}
}
