package com.seoro.seoro.domain.entity.Member;

import javax.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Friend implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long friendId;
    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member follower; // 나
    private Long following; // 친구
}
