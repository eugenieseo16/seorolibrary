package com.seoro.seoro.domain.entity.Book;

import javax.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

import com.seoro.seoro.domain.entity.User.User;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadBook implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long readBookId;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "userId")
    private User user;
    @ManyToOne(targetEntity = Book.class)
    @JoinColumn(name = "isbn")
    private Book book;
    @Temporal(TemporalType.DATE)
    private Date readDate;
}
