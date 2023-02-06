package com.seoro.seoro.domain.entity.Book;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

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
    private String bookReportContent;
    @OneToMany(mappedBy = "bookReport")
    private List<BookReportPhoto> photos = new ArrayList<>();
}
