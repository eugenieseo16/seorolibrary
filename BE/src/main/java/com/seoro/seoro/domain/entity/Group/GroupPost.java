package com.seoro.seoro.domain.entity.Group;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

import com.seoro.seoro.domain.entity.User.User;

@Entity
public class GroupPost implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupPostId;
    @ManyToOne(targetEntity = Group.class)
    @JoinColumn(name = "groupId")
    private Group group;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "userId")
    private User user;
    private PostCategory postCategory;
    @Temporal(TemporalType.TIMESTAMP)
    private Date groupPostTime;
    private String groupPostContent;

}
