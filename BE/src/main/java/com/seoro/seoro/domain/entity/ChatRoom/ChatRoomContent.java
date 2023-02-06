package com.seoro.seoro.domain.entity.ChatRoom;

import javax.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

import com.seoro.seoro.domain.entity.User.User;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoomContent implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomContentId;
    @ManyToOne(targetEntity = ChatRoom.class)
    @JoinColumn(name = "chatRoomId")
    private ChatRoom chatRoom;
    @OneToOne
    @JoinColumn(name = "userId")
    private User user;
    @OneToOne
    @JoinColumn(name = "chatRoomPhotoId")
    private ChatRoomPhoto chatRoomPhoto;
    @OneToOne
    @JoinColumn(name = "contentId")
    private ContentDetail contentDetail;
    @Temporal(TemporalType.TIMESTAMP)
    private Date time;
}
