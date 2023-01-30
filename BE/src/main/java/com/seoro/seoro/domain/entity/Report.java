package com.seoro.seoro.domain.entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class Report implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;
    private Long reportedUserId;
    private String reportContent;
}
