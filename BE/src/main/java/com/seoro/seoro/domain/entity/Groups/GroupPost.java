package com.seoro.seoro.domain.entity.Groups;

import javax.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.seoro.seoro.domain.entity.User.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupPost implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupPostId;
    private String groupPostTitle;
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
