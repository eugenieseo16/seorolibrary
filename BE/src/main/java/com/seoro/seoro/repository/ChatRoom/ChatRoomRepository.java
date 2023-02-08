package com.seoro.seoro.repository.ChatRoom;

import com.seoro.seoro.domain.entity.ChatRoom.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

}
