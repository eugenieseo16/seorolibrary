package com.seoro.seoro.domain.dto.Group;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GroupBookDto {
	private String isbn;
	private String bookTitle;
	private String bookImage;
	private String bookAuthor;
	private String bookPublisher;
	private String bookDescrib;
	private List<ReadMembers> members;
}
