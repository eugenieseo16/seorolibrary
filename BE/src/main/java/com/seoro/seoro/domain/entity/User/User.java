package com.seoro.seoro.domain.entity.User;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.seoro.seoro.domain.entity.Book.OwnBook;
import com.seoro.seoro.domain.entity.Book.ReadBook;
import com.seoro.seoro.domain.entity.Book.Review;
import com.seoro.seoro.domain.entity.ChatRoom.ChatRoomJoin;
import com.seoro.seoro.domain.entity.Groups.GroupJoin;
import com.seoro.seoro.domain.entity.Place.Place;

@Entity
public class User implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String userEmail;
    private String userName;
    private String userPassword;
    private String userProfile;
    private String userAddress;
    @Enumerated(EnumType.STRING)
    private LoginType loginType;
    @Temporal(TemporalType.DATE)
    private Date withdrawalDate;
    private Integer userScore;
    @OneToMany(mappedBy = "friend")
    private List<Friend> friends = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<Review> reviews = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<ChatRoomJoin> chatRooms = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<GroupJoin> groupJoins = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<Place> places = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<UserGenre> genres = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<OwnBook> ownBooks = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<ReadBook> readBooks = new ArrayList<>();
}
