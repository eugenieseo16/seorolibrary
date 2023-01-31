package com.seoro.seoro.domain.entity;

import jakarta.persistence.*;

import java.io.Serializable;

import com.seoro.seoro.domain.entity.User.User;

@Entity
public class Report implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "userId")
    private User user;
    private String reportContent;
}