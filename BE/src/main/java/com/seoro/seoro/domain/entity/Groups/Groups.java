package com.seoro.seoro.domain.entity.Groups;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Groups implements Serializable {
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
    @OneToMany(mappedBy = "groups")
    private List<GroupAply> aplies = new ArrayList<>();
    @OneToMany(mappedBy = "groups")
    private List<GroupJoin> joins = new ArrayList<>();
    @OneToMany(mappedBy = "groups")
    private List<GroupGenre> genres = new ArrayList<>();
    @OneToMany(mappedBy = "groups")
    private List<GroupPost> posts = new ArrayList<>();
}
