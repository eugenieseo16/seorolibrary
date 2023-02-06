package com.seoro.seoro.domain.dto.Library;

import java.util.List;

import com.seoro.seoro.domain.dto.User.UserProfileDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LibraryMainResponseDto {
	private UserProfileDto userProfile;
	private Integer groupCnt;
	private Integer ownCommentCnt;
	private Integer bookReportCnt;
	private List<Book> ownBooks;
	private List<Book> readBook;
}
