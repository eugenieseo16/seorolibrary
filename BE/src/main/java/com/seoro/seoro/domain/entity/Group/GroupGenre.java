package com.seoro.seoro.domain.entity.Group;

import jakarta.persistence.*;

import java.io.Serializable;

import com.seoro.seoro.domain.entity.Genre;

@Entity
public class GroupGenre implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupGenreId;
    @ManyToOne(targetEntity = Group.class)
    @JoinColumn(name = "groupId")
    private Group group;
    @ManyToOne(targetEntity = Genre.class)
    @JoinColumn(name = "genreId")
    private Genre genre;
}
