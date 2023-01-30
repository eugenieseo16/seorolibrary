package com.seoro.seoro.domain.entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class Place implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placeId;
    private Long userId;
    private String placeName;
    private String placeAddress;
}
