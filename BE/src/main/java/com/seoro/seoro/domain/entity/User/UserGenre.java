package com.seoro.seoro.domain.entity.User;

import jakarta.persistence.*;

import java.io.Serializable;

import com.seoro.seoro.domain.entity.Genre;

@Entity
public class UserGenre implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userGenreId;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "userId")
    private User user;
    @ManyToOne(targetEntity = Genre.class)
    @JoinColumn(name = "genreId")
    private Genre genre;
}
