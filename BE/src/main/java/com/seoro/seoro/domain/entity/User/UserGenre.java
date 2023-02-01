package com.seoro.seoro.domain.entity.User;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

import com.seoro.seoro.domain.entity.Genre;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
