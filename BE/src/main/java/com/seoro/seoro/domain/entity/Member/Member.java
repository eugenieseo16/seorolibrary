package com.seoro.seoro.domain.entity.Member;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.seoro.seoro.domain.entity.Book.BookReport;
import com.seoro.seoro.domain.entity.Book.OwnBook;
import com.seoro.seoro.domain.entity.Book.ReadBook;
import com.seoro.seoro.domain.entity.Book.Review;
import com.seoro.seoro.domain.entity.ChatRoom.ChatRoomJoin;
import com.seoro.seoro.domain.entity.Groups.GroupJoin;
import com.seoro.seoro.domain.entity.Groups.Groups;
import com.seoro.seoro.domain.entity.Place.Place;
@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    @NotNull
    @Column(unique = true)
    private String memberEmail;
    @NotNull
    @Column(unique = true)
    private String memberName;
    @NotNull
    private String memberPassword;
    private String memberProfile;
    private String memberDongCode;
    @Enumerated(EnumType.STRING)
    private LoginType loginType;
    @Temporal(TemporalType.DATE)
    private Date withdrawalDate;
    private Integer memberScore;
    private Long memberGenre;
    @OneToMany(mappedBy = "follower")
    @Builder.Default
    private List<Friend> friends = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    @Builder.Default
    private List<Review> reviews = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    @Builder.Default
    private List<ChatRoomJoin> chatRooms = new ArrayList<>();
    @OneToMany(mappedBy = "host")
    @Builder.Default
    private List<Groups> hostGroups = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    @Builder.Default
    private List<GroupJoin> groupJoins = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    @Builder.Default
    private List<Place> places = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    @Builder.Default
    private List<OwnBook> ownBooks = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    @Builder.Default
    private List<ReadBook> readBooks = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    @Builder.Default
    private List<BookReport> bookReports = new ArrayList<>();
}
