package com.seoro.seoro.domain.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
public class Book implements Serializable {
    @Id
    private String isbn;
    private String bookTitle;
    private String bookAuthor;
    private String bookPublisher;
    private String bookImage;
    private String bookDescrib;
    @Temporal(TemporalType.DATE)
    private Date bookPubDate;
    private Integer bookPage;
}
