package com.seoro.seoro.domain.entity;

import jakarta.persistence.Entity;

import java.io.Serializable;

@Entity
public class GroupGenre implements Serializable {
    private Long groupId;
    private Long genreId;
}
