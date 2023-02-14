package com.seoro.seoro.controller;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.seoro.seoro.domain.dto.GenreResponseDto;
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
	public JSONObject searchByInput(@PathVariable String input) throws IOException, ParseException, URISyntaxException {
		JSONObject result = new JSONObject();
		List books = bookService.findBook(input);
		if(books!=null){
			result.put("books",books);
			result.put("result",true);
		}else{
			result.put("result", false);
		}
		result.put("member",memberService.findByMemberNameLike(input));
		return result;
	}

	//베스트셀러 출력
	@GetMapping("/best")
	public List findBestSeller() throws IOException {
		return bookService.findBestSeller();
	}

	//근처 사용자의 보유 도서 조회
	@GetMapping("/nearbook/{memberId}")
	public JSONObject findNearBook(@PathVariable Long memberId){
		List books = bookService.findBookByDong(memberId);
		JSONObject result = new JSONObject();
		if(books==null){
			result.put("result",false);
		}else{
			result.put("result",true);
			result.put("books",books);
		}
		return result;
	}

	@GetMapping("/genres")
	public GenreResponseDto getGenres(@RequestParam("genres") int[] genres) {
		return memberService.getGenres(genres);
	}
}
