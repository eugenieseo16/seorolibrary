package com.seoro.seoro.domain.entity.ChatRoom;

import javax.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoom implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomId;

    @OneToMany(mappedBy = "chatRoom")
    private List<ChatRoomContent> contents = new ArrayList<>();
    @OneToMany(mappedBy = "chatRoom")
    private List<ChatRoomJoin> joins = new ArrayList<>();
}
