package com.seoro.seoro.domain.entity.ChatRoom;

import jakarta.persistence.*;

import java.io.Serializable;

import com.seoro.seoro.domain.entity.User.User;

@Entity
public class ChatRoomJoin implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomJoinId;
    @ManyToOne(targetEntity = ChatRoom.class)
    @JoinColumn(name = "chatRoomId")
    private ChatRoom chatRoom;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "userId")
    private User user;
}
