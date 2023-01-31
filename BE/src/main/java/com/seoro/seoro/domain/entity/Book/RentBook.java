package com.seoro.seoro.domain.entity.Book;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

import com.seoro.seoro.domain.entity.ChatRoom.ChatRoom;
import com.seoro.seoro.domain.entity.User.User;

@Entity
public class RentBook implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String rendBookId;
    @ManyToOne(targetEntity = ChatRoom.class)
    @JoinColumn(name = "chatRoomId")
    private ChatRoom chatRoom;
    @ManyToOne(targetEntity = Book.class)
    @JoinColumn(name = "isbn")
    private Book book;
    @Temporal(TemporalType.DATE)
    private Date rendDate;
    private Boolean isReturn;
}
