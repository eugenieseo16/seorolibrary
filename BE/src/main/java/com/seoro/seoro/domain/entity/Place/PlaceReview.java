package com.seoro.seoro.domain.entity.Place;

import jakarta.persistence.*;

import java.io.Serializable;

import com.seoro.seoro.domain.entity.User.User;

@Entity
public class PlaceReview implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placeReviewId;
    @ManyToOne(targetEntity = Place.class)
    @JoinColumn(name = "placeId")
    private Place place;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "userId")
    private User user;
    private Integer score;
    private String reviewContent;
}
