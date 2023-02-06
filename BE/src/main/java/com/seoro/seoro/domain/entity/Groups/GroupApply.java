package com.seoro.seoro.domain.entity.Groups;

import javax.persistence.*;

import java.io.Serializable;

import com.seoro.seoro.domain.entity.Member.Member;

@Entity
public class GroupApply implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupAplyId;
    @ManyToOne(targetEntity = Groups.class)
    @JoinColumn(name = "groupId")
    private Groups groups;
    @ManyToOne(targetEntity = Member.class)
    @JoinColumn(name = "memberId")
    private Member member;
    private Boolean isDelete;
}
