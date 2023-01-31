package com.seoro.seoro.domain.entity.User;

import jakarta.persistence.Entity;

import java.io.Serializable;

@Entity
public class UserGenre implements Serializable {
    private Long userId;
    private Long genreId;
}
