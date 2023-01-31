package com.seoro.seoro.domain.entity.ChatRoom;

import jakarta.persistence.Entity;

import java.io.Serializable;

@Entity
public class ChatRoomJoin implements Serializable {
    private Long chatRoomId;
    private Long userId;
}
