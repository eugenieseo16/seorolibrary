package com.seoro.seoro.domain.entity.Group;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
public class Group implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupId;
    private Long groupHostId;
    private Long groupChatId;
    private String groupName;
    private String groupIntroduction;
    private String groupPersonnel;
    private String groupProfile;
    private Boolean isOnline;
    private String groupAddress;
    @Temporal(TemporalType.DATE)
    private Date groupStartDate;
    @Temporal(TemporalType.DATE)
    private Date groupEndDate;
}
