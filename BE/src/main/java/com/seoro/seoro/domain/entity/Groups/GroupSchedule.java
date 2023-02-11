package com.seoro.seoro.domain.entity.Groups;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class GroupSchedule implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupScheduleId;
    @ManyToOne(targetEntity = Groups.class)
    @JoinColumn(name = "groupId")
    private Groups groups;
    @CreationTimestamp
    private LocalDateTime date;
    private String scheduleTitle;
    private String scheduleContent;
}
