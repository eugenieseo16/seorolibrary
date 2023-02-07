package com.seoro.seoro.domain.entity.Groups;

import javax.persistence.*;
import javax.persistence.Entity;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;;
import java.util.List;

import com.seoro.seoro.domain.entity.Member.Member;
import lombok.*;
import org.hibernate.annotations.*;
import org.hibernate.annotations.Generated;

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
    @ManyToOne(targetEntity = Member.class)
    @JoinColumn(name = "memberId")
    private Member member;
    @Enumerated(EnumType.STRING)
    private PostCategory postCategory;
    @CreationTimestamp
    private LocalDateTime groupPostTime;
    @ColumnDefault("false")
    private Boolean isUpdate;
    private String groupPostContent;
    @Builder.Default
    @OneToMany(mappedBy = "groupPost")
    private List<GroupPostPhoto> photos = new ArrayList<>();
}
