package com.seoro.seoro.domain.dto.Chat;

import java.util.HashMap;

import lombok.Data;

// Stomp 를 통해서 pub/sub를 사용하면 구독자 관리가 알아서 됨
// 따라서 따로 세션을 관리하는 코드를 작성할 필요가 없음
// 메시지를 다른 세션의 클라이언트들에게 발송하는 것도 구현할 필요 없음
@Data
public class ChatRoomDto {
	private String roomId; //채팅방 아이디
	private Long memberCount; //채팅방 인원수

	private HashMap<String, String> userList = new HashMap<>();
}
