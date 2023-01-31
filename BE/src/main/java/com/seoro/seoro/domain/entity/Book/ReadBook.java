package com.seoro.seoro.domain.entity.Book;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
public class ReadBook implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long readBookId;
    private Long userId;
    private String isbn;
    @Temporal(TemporalType.DATE)
    private Date readDate;
}
