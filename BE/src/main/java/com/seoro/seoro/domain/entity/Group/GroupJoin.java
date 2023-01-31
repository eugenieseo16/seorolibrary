package com.seoro.seoro.domain.entity.Group;

import jakarta.persistence.*;

import java.io.Serializable;

import com.seoro.seoro.domain.entity.User.User;

@Entity
public class GroupJoin implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupJoinId;
    @ManyToOne(targetEntity = Group.class)
    @JoinColumn(name = "groupId")
    private Group group;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "userId")
    private User user;
}
