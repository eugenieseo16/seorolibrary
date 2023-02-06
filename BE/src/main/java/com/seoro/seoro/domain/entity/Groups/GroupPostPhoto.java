package com.seoro.seoro.domain.entity.Groups;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupPostPhoto implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupPostPhotoId;
    @ManyToOne(targetEntity = GroupPost.class)
    @JoinColumn(name = "groupPostId")
    private GroupPost groupPost;
    private String groupPostPhoto;
}
