package com.seoro.seoro.domain.entity.Place;

import jakarta.persistence.*;

import java.io.Serializable;

import com.seoro.seoro.domain.entity.User.User;

@Entity
public class Place implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placeId;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "userId")
    private User user;
    private String placeName;
    private String placeAddress;
}
