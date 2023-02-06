package com.seoro.seoro.domain.entity.Groups;

import javax.persistence.*;
import lombok.*;

import java.io.Serializable;

import com.seoro.seoro.domain.entity.User.User;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupJoin implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupJoinId;
    @ManyToOne(targetEntity = Groups.class)
    @JoinColumn(name = "groupId")
    private Groups groups;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "userId")
    private User user;
}
