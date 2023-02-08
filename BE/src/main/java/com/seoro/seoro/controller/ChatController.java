package com.seoro.seoro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoro.seoro.domain.dto.Chat.ChatDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatController {
	private final SimpMessageSendingOperations template;

	// MessageMapping 을 통해 webSocket 로 들어오는 메시지를 발신 처리한다.
	// 이때 클라이언트에서는 /pub/chat/message 로 요청하게 되고 이것을 controller 가 받아서 처리한다.
	// 처리가 완료되면 /sub/chat/room/roomId 로 메시지가 전송된다.
	//해당 유저
	@MessageMapping("/chat/sendMessage")
	public void enterUser(@Payload ChatDto chat) {
		log.info("CHAT {}", chat);
		chat.setMessage(chat.getMessage());
		template.convertAndSend("/sub/chat/room/"+chat.getChatRoomId(), chat);
	}

}
