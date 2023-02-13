package com.seoro.seoro.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoro.seoro.service.Book.BookService;
import com.seoro.seoro.service.Member.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/main")
public class MainController {

	private final BookService bookService;
	private final MemberService memberService;

	//사용자 및 도서 검색
	@GetMapping("/search/{input}")
	public List<List> searchByInput(@PathVariable String input) throws IOException, ParseException {
		List<List> result = new ArrayList<>();
		result.add(bookService.findBook(input));
		result.add(memberService.findByMemberNameLike("%"+input+"%"));
		return result;
	}

	//베스트셀러 출력
	@GetMapping("/best")
	public List findBestSeller() throws IOException {
		return bookService.findBestSeller();
	}

	//근처 사용자의 보유 도서 조회
	@GetMapping("/nearbook/{memberId}")
	public List findNearBook(@PathVariable Long memberId){
		return bookService.findBookByDong(memberId);
	}
}
