package com.seoro.seoro.domain.entity.Groups;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.seoro.seoro.domain.entity.Member.Member;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Groups implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupId;
    @ManyToOne(targetEntity = Member.class)
    @JoinColumn(name = "memberId")
    private Member host;
    private Long groupChatId;
    @NotNull
    private String groupName;
    private String groupIntroduction;
    private int groupCapacity;
    private String groupProfile;
    private Boolean isOnline;
    private String groupDongCode;
    @Temporal(TemporalType.DATE)
    private Date groupStartDate;
    @Temporal(TemporalType.DATE)
    private Date groupEndDate;
    private Long groupGenre;
    @Builder.Default
    @OneToMany(mappedBy = "groups", cascade = CascadeType.REMOVE)
    private List<GroupApply> applies = new ArrayList<>();
    @Builder.Default
    @OneToMany(mappedBy = "groups", cascade = CascadeType.REMOVE)
    private List<GroupJoin> joins = new ArrayList<>();
    @Builder.Default
    @OneToMany(mappedBy = "groups", cascade = CascadeType.REMOVE)
    private List<GroupPost> posts = new ArrayList<>();
    @Builder.Default
    @OneToMany(mappedBy = "groups", cascade = CascadeType.REMOVE)
    private List<GroupBook> books = new ArrayList<>();
    @Builder.Default
    @OneToMany(mappedBy = "groups", cascade = CascadeType.REMOVE)
    private List<GroupSchedule> meetings = new ArrayList<>();

}
