package com.seoro.seoro.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoro.seoro.domain.dto.Library.LibraryMainResponseDto;
import com.seoro.seoro.service.Library.LibraryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/librarys")
@RequiredArgsConstructor
public class LibraryController {
	private final LibraryService libraryService;

	@GetMapping("/{userId}")
	public LibraryMainResponseDto libraryMain(@PathVariable Long userId) {
		return libraryService.libraryMain(userId);
	}

	/*
	조회 관련
	*/
	// 도서관 조회
	// 프로필, 팔로워, 팔로잉, 참여 모임, 작성 한줄평, 작성 리뷰, 보유도서, 읽은도서

	// 참여 모임 조회

	// 작성 한줄평 조회

	// 작성 리뷰 조회

	// 작성 기록 조회

	// 통계 목록 조회

	// 도서 상세 조회

	// 팔로워 조회

	// 팔로잉 조회

	/*
	CRUD
	 */
	// 모임 상세 조회
	// 한줄평 수정
	// 한줄평 삭제
	// 리뷰 수정
	// 리뷰 삭제
	// 기록 수정
	// 기록 삭제
	// 보유도서 등록
	// 보유도서 삭제
	// 도서 상세
	// 친구 추가
	// 친구 삭제
	// 프로필 수정
	// 프로필 삭제

	/*
	채팅 관련
	 */
	// 1:1 채팅
	// 도서 교환
}
