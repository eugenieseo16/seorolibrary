package com.seoro.seoro.domain.entity.Groups;

import com.seoro.seoro.domain.entity.Book.Book;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.seoro.seoro.domain.entity.User.User;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Groups implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupId;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "userId")
    private User host;
    private Long groupChatId;
    @NotNull
    private String groupName;
    private String groupIntroduction;
    private int groupCapacity;
    private String groupProfile;
    private Boolean isOnline;
    private String gropuDongCode;
    @Temporal(TemporalType.DATE)
    private Date groupStartDate;
    @Temporal(TemporalType.DATE)
    private Date groupEndDate;
    @OneToMany(mappedBy = "groups")
    private List<GroupApply> applies = new ArrayList<>();
    @OneToMany(mappedBy = "groups")
    private List<GroupJoin> joins = new ArrayList<>();
    @OneToMany(mappedBy = "groups")
    private List<GroupGenre> genres = new ArrayList<>();
    @OneToMany(mappedBy = "groups")
    private List<GroupPost> posts = new ArrayList<>();
    @OneToMany(mappedBy = "groups")
    private List<GroupBook> books = new ArrayList<>();

}
