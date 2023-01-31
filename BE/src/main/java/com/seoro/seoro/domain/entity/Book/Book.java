package com.seoro.seoro.domain.entity.Book;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    @OneToMany(mappedBy = "book")
    private List<Review> reviews = new ArrayList<>();
}
