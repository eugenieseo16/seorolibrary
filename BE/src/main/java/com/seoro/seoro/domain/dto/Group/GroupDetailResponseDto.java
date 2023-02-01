package com.seoro.seoro.domain.dto.Group;

import java.util.Date;
import java.util.List;

import com.seoro.seoro.domain.entity.ChatRoom.ChatRoomContent;
import com.seoro.seoro.domain.entity.Groups.GroupBook;
import com.seoro.seoro.domain.entity.Groups.GroupPost;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupDetailResponseDto {
	private Boolean result;
	private String groupName;
	private Date groupStartDate;
	private Date groupEndDate;
	private String groupDongCode;
	private Integer groupCapacity;
	private String groupDescrib;
	private List<GroupPost> groupPost;
	private List<GroupBook> books;
	private List<ChatRoomContent> chatting;
	private Integer diaryCount;
	private Integer reviewCount;
}
