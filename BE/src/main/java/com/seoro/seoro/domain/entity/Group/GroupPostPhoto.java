package com.seoro.seoro.domain.entity.Group;

import jakarta.persistence.Entity;

import java.io.Serializable;

@Entity
public class GroupPostPhoto implements Serializable {
    private Long groupPostId;
    private String groupPostPhoto;
}
