package com.seoro.seoro.repository.ChatRoom;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seoro.seoro.domain.entity.ChatRoom.ChatRoom;
import com.seoro.seoro.domain.entity.ChatRoom.ChatRoomJoin;
import com.seoro.seoro.domain.entity.Member.Member;

@Repository
public interface ChatRoomJoinRepository extends JpaRepository<ChatRoomJoin, Long> {

	List<ChatRoomJoin> findAllByMember(Member member);

	ChatRoomJoin findChatRoomJoinByChatRoomAndMemberNot(ChatRoom chatRoom, Member member);
}
