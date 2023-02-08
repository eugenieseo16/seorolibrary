package com.seoro.seoro.domain.dto.Chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatDto {
	//메시지 타입 : 입장, 채팅
	//메시지 타입에 따라서 동작하는 구조가 달라짐
	//입장과 퇴장 ENTER 와 LEAVE 의 경우 입장/퇴장 이벤트 처리가 실행
	//TALK은 내용이 해당 채팅방을 SUB하고 있는 모든 클라이언트들에게 전달
	public enum MessageType {
		ENTER, TALK, LEAVE;
	}
	
	private MessageType type;
	private Long chatRoomId;
	private String sender; //채팅을 보낸 사람
	private String message;
	private String time; //채팅 발송 시간
}
