package com.seoro.seoro.domain.entity.ChatRoom;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoomPhoto implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long chatRoomPhotoId;
    private String photo;
}
