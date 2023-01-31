package com.seoro.seoro.domain.entity.Group;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    @Enumerated(EnumType.STRING)
    private PostCategory postCategory;
    @Temporal(TemporalType.TIMESTAMP)
    private Date groupPostTime;
    private String groupPostContent;

    @OneToMany(mappedBy = "groupPost")
    private List<GroupPostPhoto> photos = new ArrayList<>();
}
