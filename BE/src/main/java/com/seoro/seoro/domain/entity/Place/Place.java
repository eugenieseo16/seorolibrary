package com.seoro.seoro.domain.entity.Place;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.seoro.seoro.domain.entity.Member.Member;

import lombok.Getter;

@Entity
@Getter
public class Place implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placeId;
    @ManyToOne(targetEntity = Member.class)
    @JoinColumn(name = "memberId")
    private Member member;
    @NotNull
    private String placeName;
    private String placeLatitude;
    private String placeLongitude;
    @OneToMany(mappedBy = "place")
    private List<PlacePhoto> photos = new ArrayList<>();
}
