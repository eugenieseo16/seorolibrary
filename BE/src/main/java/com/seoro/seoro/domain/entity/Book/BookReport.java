package com.seoro.seoro.domain.entity.Book;

import javax.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.seoro.seoro.domain.entity.Member.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookReport implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookReportId;
    @ManyToOne(targetEntity = ReadBook.class)
    @JoinColumn(name="readBookId")
    private ReadBook readBook;
    @ManyToOne(targetEntity = Member.class)
    @JoinColumn(name = "memberId")
    private Member member;
    private String bookReportTitle;
    private String bookReportContent;
    @Builder.Default
    @OneToMany(mappedBy = "bookReport")
    private List<BookReportPhoto> photos = new ArrayList<>();
}
