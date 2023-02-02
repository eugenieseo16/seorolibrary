package com.seoro.seoro.repository.ChatRoom;

import com.seoro.seoro.domain.entity.ChatRoom.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<ChatRoom, Long> {
}
