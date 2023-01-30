package com.seoro.seoro.domain.entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class ContentDetail implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contentId;
    private String contentDetail;
}
