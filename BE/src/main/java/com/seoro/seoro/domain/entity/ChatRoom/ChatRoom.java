package com.seoro.seoro.domain.entity.ChatRoom;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class ChatRoom implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomId;
}
