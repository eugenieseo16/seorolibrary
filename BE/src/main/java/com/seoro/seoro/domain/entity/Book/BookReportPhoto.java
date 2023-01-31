package com.seoro.seoro.domain.entity.Book;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.io.Serializable;

@Entity
public class BookReportPhoto implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookReportPhotoId;
    @ManyToOne(targetEntity = BookReport.class)
    @JoinColumn(name = "bookReportId")
    private BookReport bookReport;
    private String photo;
}
