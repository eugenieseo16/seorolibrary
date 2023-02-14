package com.seoro.seoro.domain.entity.Place;

import javax.persistence.*;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlaceReviewPhoto implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placeReviewPhotoId;
    @ManyToOne(targetEntity = PlaceReview.class)
    @JoinColumn(name = "placeReviewId")
    private PlaceReview placeReview;
    private String photo;
}
