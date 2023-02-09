package com.seoro.seoro.domain.entity.Place;

import javax.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.seoro.seoro.domain.entity.Member.Member;

@Entity
public class PlaceReview implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placeReviewId;
    @ManyToOne(targetEntity = Place.class)
    @JoinColumn(name = "placeId"    )
    private Place place;
    @ManyToOne(targetEntity = Member.class)
    @JoinColumn(name = "memberId")
    private Member member;
    private Integer score;
    private String reviewContent;
    @OneToMany(mappedBy = "placeReview")
    private List<PlaceReviewPhoto> photos = new ArrayList<>();
}
