package com.seoro.seoro.domain.entity.Place;

import javax.persistence.*;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlacePhoto implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placePhotoId;
    @ManyToOne(targetEntity = Place.class)
    @JoinColumn(name = "placeId")
    private Place place;
    private String photo;
}
