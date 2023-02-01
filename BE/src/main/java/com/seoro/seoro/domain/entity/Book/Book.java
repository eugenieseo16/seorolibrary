package com.seoro.seoro.domain.entity.Book;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Entity
public class Book implements Serializable {
    @Id
    private String isbn;
    @NotNull
    private String bookTitle;
    @NotNull
    private String bookAuthor;
    @NotNull
    private String bookPublisher;
    private String bookImage;
    private String bookDescrib;
    @Temporal(TemporalType.DATE)
    private Date bookPubDate;
    private Integer bookPage;
    @OneToMany(mappedBy = "book")
    private List<Review> reviews = new ArrayList<>();
}
