package com.seoro.seoro.domain.entity.Groups;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class GroupPostPhoto implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupPostPhotoId;
    @ManyToOne(targetEntity = GroupPost.class)
    @JoinColumn(name = "groupPostId")
    private GroupPost groupPost;
    private String groupPostPhoto;
}
