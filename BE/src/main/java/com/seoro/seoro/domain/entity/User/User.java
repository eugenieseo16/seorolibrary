package com.seoro.seoro.domain.entity.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.Getter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.validator.constraints.UniqueElements;

import com.seoro.seoro.domain.entity.Book.OwnBook;
import com.seoro.seoro.domain.entity.Book.ReadBook;
import com.seoro.seoro.domain.entity.Book.Review;
import com.seoro.seoro.domain.entity.ChatRoom.ChatRoomJoin;
import com.seoro.seoro.domain.entity.Groups.GroupJoin;
import com.seoro.seoro.domain.entity.Groups.Groups;
import com.seoro.seoro.domain.entity.Place.Place;
@Entity
@Getter
public class User implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    @NotNull
    @Column(unique = true)
    private String userEmail;
    @NotNull
    @Column(unique = true)
    private String userName;
    @NotNull
    private String userPassword;
    private String userProfile;
    private String userDongCode;
    @Enumerated(EnumType.STRING)
    private LoginType loginType;
    @Temporal(TemporalType.DATE)
    private Date withdrawalDate;
    private Integer userScore;
    private Long userGenre;
    @OneToMany(mappedBy = "friend")
    private List<Friend> friends = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<Review> reviews = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<ChatRoomJoin> chatRooms = new ArrayList<>();
    @OneToMany(mappedBy = "host")
    private List<Groups> hostGroups = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<GroupJoin> groupJoins = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<Place> places = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<OwnBook> ownBooks = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<ReadBook> readBooks = new ArrayList<>();
}
