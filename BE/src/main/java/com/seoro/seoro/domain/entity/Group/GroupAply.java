package com.seoro.seoro.domain.entity.Group;

import jakarta.persistence.Entity;

import java.io.Serializable;

@Entity
public class GroupAply implements Serializable {
    private Long groupId;
    private Long userId;
    private Boolean isDelete;
}
