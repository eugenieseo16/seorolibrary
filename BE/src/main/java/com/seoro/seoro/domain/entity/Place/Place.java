package com.seoro.seoro.domain.entity.Place;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.seoro.seoro.domain.entity.Book.Review;
import com.seoro.seoro.domain.entity.Member.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
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
	private String dongCode;
    private Float score;
    private String describ;

    @Builder.Default
    @OneToMany(mappedBy = "place")
    private List<PlacePhoto> photos = new ArrayList<>();
    @Builder.Default
    @OneToMany(mappedBy = "place")
    private List<PlaceReview> reviews = new ArrayList<>();
}
