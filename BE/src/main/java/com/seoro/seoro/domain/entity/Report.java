package com.seoro.seoro.domain.entity;

import javax.persistence.*;

import java.io.Serializable;

import com.seoro.seoro.domain.entity.Member.Member;

@Entity
public class Report implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;
    @ManyToOne(targetEntity = Member.class)
    @JoinColumn(name = "memberId")
    private Member member;
    private String reportContent;
}