package com.seoro.seoro.domain.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
public class ReadBook implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long readBookId;
    private Long readUserId;
    private String readIsbn;
    @Temporal(TemporalType.DATE)
    private Date readDate;
}
