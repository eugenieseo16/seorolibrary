package com.seoro.seoro.repository.Place;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seoro.seoro.domain.entity.Place.Place;

public interface PlaceRepository extends JpaRepository<Place, Long> {
}
