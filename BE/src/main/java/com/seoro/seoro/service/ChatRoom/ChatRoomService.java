package com.seoro.seoro.service.ChatRoom;

import java.util.List;

import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Chat.ChatRoomCreateRequestDto;
import com.seoro.seoro.domain.dto.Chat.ChatRoomCreateResponseDto;
import com.seoro.seoro.domain.dto.Chat.ChatRoomDetailResponseDto;
import com.seoro.seoro.domain.dto.Chat.ChatRoomReadResponseDto;

@Service
public interface ChatRoomService {
	ChatRoomReadResponseDto chatRoomList(Long userId);
	ChatRoomCreateResponseDto createChatRoom(ChatRoomCreateRequestDto requestDto);
	ChatRoomDetailResponseDto detailChatRoom(Long chatRoomId);

}
