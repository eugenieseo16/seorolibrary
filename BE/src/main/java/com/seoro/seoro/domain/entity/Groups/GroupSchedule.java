package com.seoro.seoro.domain.entity.Groups;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class GroupSchedule implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupScheduleId;
    @ManyToOne(targetEntity = Groups.class)
    @JoinColumn(name = "groupId")
    private Groups groups;
    private LocalDateTime date;
    private String scheduleTitle;
    private String scheduleContent;
}
