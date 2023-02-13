package com.seoro.seoro.domain.entity.Book;

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

import com.seoro.seoro.domain.entity.Member.Member;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadBook implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long readBookId;
    @ManyToOne(targetEntity = Member.class)
    @JoinColumn(name = "memberId")
    private Member member;
    @NotNull
    private String isbn;
    private String bookTitle;
    private String bookImage;
    @Temporal(TemporalType.DATE)
    private Date readDate;
    @Builder.Default
    @OneToMany(mappedBy = "readBook")
    private List<Review> reviews = new ArrayList<>();
}
