package com.seoro.seoro.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.io.Serializable;
import java.util.Date;

@Entity
public class ChatRoomContent implements Serializable {
    private Long chatRoomId;
    private Long userId;
    private Long photoId;
    private Long contentId;
    @Temporal(TemporalType.TIMESTAMP)
    private Date time;
}
