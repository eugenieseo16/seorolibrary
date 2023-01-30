package com.seoro.seoro.domain.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
public class GroupPost implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupPostId;
    private Long GroupId;
    private Long userId;
    private PostCategory postCategory;
    @Temporal(TemporalType.TIMESTAMP)
    private Date groupPostTime;
    private String groupPostContent;

}
