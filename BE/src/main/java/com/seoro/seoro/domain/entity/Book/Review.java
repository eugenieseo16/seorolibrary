package com.seoro.seoro.domain.entity.Book;

import javax.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

import com.seoro.seoro.domain.entity.User.User;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class Review implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "userId")
    private User user;
    @ManyToOne(targetEntity = ReadBook.class)
    @JoinColumn(name = "isbn")
    private ReadBook readBook;
    private String reviewContent;
}
