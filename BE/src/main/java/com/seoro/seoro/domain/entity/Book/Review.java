package com.seoro.seoro.domain.entity.Book;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

import com.seoro.seoro.domain.entity.User.User;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Review implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "userId")
    private User user;
    @ManyToOne(targetEntity = Book.class)
    @JoinColumn(name = "isbn")
    private Book book;
    private String reviewContent;
}
