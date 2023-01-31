package com.seoro.seoro.domain.entity.Book;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class BookReport implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookReportId;
    @ManyToOne(targetEntity = ReadBook.class)
    @JoinColumn(name="readBookId")
    private ReadBook readBook;
    private String bookReportContent;

}
