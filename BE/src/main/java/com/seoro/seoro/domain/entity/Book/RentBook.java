package com.seoro.seoro.domain.entity.Book;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
public class RentBook implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String rendBookId;
    private Long chatRoomId;
    private String isbn;
    @Temporal(TemporalType.DATE)
    private Date rendDate;
    private Boolean isReturn;
}
