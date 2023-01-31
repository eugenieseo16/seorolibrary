package com.seoro.seoro.domain.entity.Place;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class PlacePhoto implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placePhotoId;
    @ManyToOne(targetEntity = Place.class)
    @JoinColumn(name = "placeId")
    private Place place;
    private String photo;
}
