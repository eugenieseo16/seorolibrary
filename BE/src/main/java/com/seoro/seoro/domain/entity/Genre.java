package com.seoro.seoro.domain.entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class Genre implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long genreId;
    private String genreName;
}
