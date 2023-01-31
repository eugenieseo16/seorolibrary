package com.seoro.seoro.domain.entity.Book;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.io.Serializable;

import com.seoro.seoro.domain.entity.User.User;

@Entity
public class OwnBook implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ownBookId;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "userId")
    private User user;
    @ManyToOne(targetEntity = Book.class)
    @JoinColumn(name = "isbn")
    private Book book;
    private String ownComment;
    private Boolean isOwn;
}
