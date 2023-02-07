package com.seoro.seoro.repository.ChatRoom;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seoro.seoro.domain.entity.ChatRoom.ContentDetail;

@Repository
public interface ContentDetailRepository extends JpaRepository<ContentDetail, Long> {
}
