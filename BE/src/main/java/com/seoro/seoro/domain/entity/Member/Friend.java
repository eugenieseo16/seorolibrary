package com.seoro.seoro.domain.entity.Member;

import javax.persistence.*;
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
    @JoinColumn(name = "memberId")
    private Member followerId;
    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member followingId;
}
