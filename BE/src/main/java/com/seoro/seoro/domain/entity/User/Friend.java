package com.seoro.seoro.domain.entity.User;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class Friend implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long friendId;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "userId")
    private User user;
}
