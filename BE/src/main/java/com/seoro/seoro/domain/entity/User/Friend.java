package com.seoro.seoro.domain.entity.User;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Friend implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long friendId;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User friend;
}
