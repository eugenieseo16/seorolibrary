package com.seoro.seoro.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.seoro.seoro.domain.dto.Chat.ChatRoomCreateRequestDto;
import com.seoro.seoro.domain.dto.Chat.ChatRoomCreateResponseDto;
import com.seoro.seoro.domain.dto.Chat.ChatRoomDetailResponseDto;
import com.seoro.seoro.domain.dto.Chat.ChatRoomReadResponseDto;
import com.seoro.seoro.service.ChatRoom.ChatRoomService;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/chatting")
public class ChatRoomController {
	private final ChatRoomService chatRoomService;

	@GetMapping
	public ChatRoomReadResponseDto chatRoomList(@RequestParam("userId") Long userId) {
		return chatRoomService.chatRoomList(userId);
	}

	@PostMapping
	public ChatRoomCreateResponseDto createChatRoom(@ModelAttribute ChatRoomCreateRequestDto requestDto) {
		return chatRoomService.createChatRoom(requestDto);
	}

	@GetMapping("/detail")
	public ChatRoomDetailResponseDto detailChatRoom(@RequestParam("chatRoomId") Long chatRoomId) {
		return chatRoomService.detailChatRoom(chatRoomId);
	}

}

