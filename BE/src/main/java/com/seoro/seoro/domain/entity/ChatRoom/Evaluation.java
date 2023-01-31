package com.seoro.seoro.domain.entity.ChatRoom;

import jakarta.persistence.*;

import java.io.Serializable;

import com.seoro.seoro.domain.entity.Book.RentBook;

@Entity
public class Evaluation implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long evaluationId;
    @ManyToOne(targetEntity = RentBook.class)
    @JoinColumn(name = "rentBookId")
    private RentBook rentBook;
    private Boolean isLike;
}
