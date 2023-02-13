package com.seoro.seoro.domain.dto.Group;

import com.seoro.seoro.domain.entity.Groups.GroupBook;
import com.seoro.seoro.domain.entity.Groups.Groups;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GroupBookDto {
	private Groups groups;
	private String isbn;
	private String bookTitle;
	private String bookImage;

	public GroupBookDto(GroupBook groupBook) {
		this.groups = groupBook.getGroups();
		this.isbn = groupBook.getIsbn();
		this.bookTitle = groupBook.getBookTitle();
		this.bookImage = groupBook.getBookImage();
	}
}
