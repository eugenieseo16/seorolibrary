package com.seoro.seoro.domain.entity.Group;

import jakarta.persistence.Entity;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.io.Serializable;
import java.util.Date;

@Entity
public class GroupSchedule implements Serializable {
    private Long groupId;
    @Temporal(TemporalType.DATE)
    private Date date;
}
