package com.seoro.seoro.domain.entity.Groups;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.seoro.seoro.domain.entity.User.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupPost implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupPostId;
    @ManyToOne(targetEntity = Groups.class)
    @JoinColumn(name = "groupId")
    private Groups groups;
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
