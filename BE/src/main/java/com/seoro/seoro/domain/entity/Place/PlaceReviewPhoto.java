package com.seoro.seoro.domain.entity.Place;

import javax.persistence.*;

import java.io.Serializable;

@Entity
public class PlaceReviewPhoto implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placeReviewPhotoId;
    @ManyToOne(targetEntity = PlaceReview.class)
    @JoinColumn(name = "placeReviewId")
    private PlaceReview placeReview;
    private String photo;
}
