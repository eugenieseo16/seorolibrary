package com.seoro.seoro.domain.entity.Book;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

import com.seoro.seoro.domain.entity.Member.Member;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class Review implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;
    @ManyToOne(targetEntity = Member.class)
    @JoinColumn(name = "memberId")
    private Member member;
    @NotNull
    @ManyToOne(targetEntity = ReadBook.class)
    @JoinColumn(name = "isbn", referencedColumnName = "isbn")
    private ReadBook readBook;
    private String reviewContent;
}
