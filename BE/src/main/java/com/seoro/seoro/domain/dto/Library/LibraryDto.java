package com.seoro.seoro.domain.dto.Library;

import java.util.List;

import com.seoro.seoro.domain.dto.Book.OwnBookDto;
import com.seoro.seoro.domain.dto.Book.OwnCommentDto;
import com.seoro.seoro.domain.dto.Book.ReadBookDto;
import com.seoro.seoro.domain.dto.Book.RentBookDto;
import com.seoro.seoro.domain.dto.Book.ReviewDto;
import com.seoro.seoro.domain.dto.Group.GroupShowDto;
import com.seoro.seoro.domain.dto.Member.FriendDto;
import com.seoro.seoro.domain.dto.Member.MemberDto;
import com.seoro.seoro.domain.entity.Groups.GroupJoin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LibraryDto {
	private boolean isOwn;
	private MemberDto memberInfo;
	private List<GroupShowDto> myGroups;
	private List<OwnBookDto> myOwnBooks;
	private List<ReadBookDto> myReadBooks;
	private List<RentBookDto> myRentBooks;
	private Long myOwnComment;
	private Long myReview;
	private Long myFollowers;
	private Long myFollowings;
	private boolean isFollowing;
}
