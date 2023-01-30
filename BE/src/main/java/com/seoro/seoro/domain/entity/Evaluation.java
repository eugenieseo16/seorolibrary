package com.seoro.seoro.domain.entity;

import jakarta.persistence.Entity;

import java.io.Serializable;

@Entity
public class Evaluation implements Serializable {
    private Long rentBookId;
    private Long chatRoomId;
    private Boolean isLike;
}
