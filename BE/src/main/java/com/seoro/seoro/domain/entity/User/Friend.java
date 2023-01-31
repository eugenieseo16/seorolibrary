package com.seoro.seoro.domain.entity.User;

import jakarta.persistence.Entity;

import java.io.Serializable;

@Entity
public class Friend implements Serializable {
    private Long userId;
    private Long friendId;
}
