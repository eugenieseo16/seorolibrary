package com.seoro.seoro.repository.Place;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.seoro.seoro.domain.entity.Place.PlacePhoto;
import com.seoro.seoro.domain.entity.Place.PlaceReview;

public interface PlacePhotoRepository extends JpaRepository<PlacePhoto, Long> {
}
