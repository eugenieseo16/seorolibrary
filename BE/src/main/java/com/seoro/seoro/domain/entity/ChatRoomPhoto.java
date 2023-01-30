package com.seoro.seoro.domain.entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class ChatRoomPhoto implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomPhotoId;
    private String photo;
}
