package com.seoro.seoro.domain.entity.Place;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class PlaceReview implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placeReviewId;
    private Long placeId;
    private Long userId;
    private Integer score;
    private String reviewContent;
}
