package com.seoro.seoro.repository.Place;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.seoro.seoro.domain.entity.Place.Place;

public interface PlaceRepository extends JpaRepository<Place, Long> {
	List<Place> findByMember_MemberId(@Param(value="memberId") Long memberId);

	// Place findByPlaceId(Long placeId);
}
