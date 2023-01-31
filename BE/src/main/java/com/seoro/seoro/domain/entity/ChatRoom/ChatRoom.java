package com.seoro.seoro.domain.entity.ChatRoom;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
public class ChatRoom implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomId;

    @OneToMany(mappedBy = "chatRoom")
    private List<ChatRoomContent> contents = new ArrayList<>();
    @OneToMany(mappedBy = "chatRoom")
    private List<ChatRoomJoin> joins = new ArrayList<>();
}
