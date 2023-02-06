package com.seoro.seoro.domain.entity.Groups;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
public class GroupSchedule implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupScheduleId;
    @ManyToOne(targetEntity = Groups.class)
    @JoinColumn(name = "groupId")
    private Groups groups;
    @Temporal(TemporalType.DATE)
    private Date date;
}
