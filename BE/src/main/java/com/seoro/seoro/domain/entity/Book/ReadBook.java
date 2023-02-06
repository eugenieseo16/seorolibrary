package com.seoro.seoro.domain.entity.Book;

import javax.persistence.*;
import lombok.AccessLevel;
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
public class ReadBook implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long readBookId;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "userId")
    private User user;
    private String isbn;
    private String bookTitle;
    private String bookImage;
    @Temporal(TemporalType.DATE)
    private Date readDate;
    @OneToMany(mappedBy = "readBook")
    private List<Review> reviews = new ArrayList<>();
}
