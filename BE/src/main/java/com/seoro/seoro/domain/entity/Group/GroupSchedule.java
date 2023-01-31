package com.seoro.seoro.domain.entity.Group;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
public class GroupSchedule implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupScheduleId;
    @ManyToOne(targetEntity = Group.class)
    @JoinColumn(name = "groupId")
    private Group group;
    @Temporal(TemporalType.DATE)
    private Date date;
}
