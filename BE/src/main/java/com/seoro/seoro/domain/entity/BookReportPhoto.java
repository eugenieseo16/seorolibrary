package com.seoro.seoro.domain.entity;

import jakarta.persistence.Entity;

import java.io.Serializable;

@Entity
public class BookReportPhoto implements Serializable {
    private Long bookReportId;
    private String photo;
}
