package com.seoro.seoro.domain.entity.Groups;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupBook implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupBookId;
    @ManyToOne(targetEntity = Groups.class)
    @JoinColumn(name = "groupId")
    private Groups groups;
    private String isbn;
    private String bookTitle;
    private String bookImage;
}
