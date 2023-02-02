package com.seoro.seoro.domain.entity.ChatRoom;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ContentDetail implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long contentId;
    private String contentDetail;
}
