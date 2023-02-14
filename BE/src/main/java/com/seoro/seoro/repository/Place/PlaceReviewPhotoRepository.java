package com.seoro.seoro.repository.Place;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seoro.seoro.domain.entity.Place.PlaceReviewPhoto;

@Repository
public interface PlaceReviewPhotoRepository extends JpaRepository<PlaceReviewPhoto, Long> {
}
