package com.seoro.seoro.domain.entity;

import jakarta.persistence.Entity;

import java.io.Serializable;

@Entity
public class OwnBook implements Serializable {
    private Long ownUserId;
    private String ownIsbn;
    private String ownComment;
    private Boolean isOwn;
}
