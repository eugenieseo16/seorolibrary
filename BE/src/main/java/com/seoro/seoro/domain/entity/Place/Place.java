package com.seoro.seoro.domain.entity.Place;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.seoro.seoro.domain.entity.User.User;

@Entity
public class Place implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placeId;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "userId")
    private User user;
    @NotNull
    private String placeName;
    private String placeLatitude;
    private String placeLongitude;
    @OneToMany(mappedBy = "place")
    private List<PlacePhoto> photos = new ArrayList<>();
}
