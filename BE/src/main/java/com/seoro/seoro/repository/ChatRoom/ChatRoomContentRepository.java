package com.seoro.seoro.repository.ChatRoom;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seoro.seoro.domain.entity.ChatRoom.ChatRoom;
import com.seoro.seoro.domain.entity.ChatRoom.ChatRoomContent;

@Repository
public interface ChatRoomContentRepository extends JpaRepository<ChatRoomContent, Long> {

	List<ChatRoomContent> findChatRoomContentByChatRoomOrderByTimeDesc(ChatRoom chatRoom);
}
