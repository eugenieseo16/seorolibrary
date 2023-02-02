package com.seoro.seoro.service.Group;

import java.util.Optional;

import com.seoro.seoro.domain.dto.Group.GroupDetailResponseDto;
import com.seoro.seoro.domain.dto.Group.GroupMainResponseDto;
import com.seoro.seoro.domain.entity.ChatRoom.ChatRoom;
import com.seoro.seoro.repository.ChatRoom.ChatRepository;
import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Group.GroupSignupRequestDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.domain.entity.Groups.Groups;
import com.seoro.seoro.domain.entity.User.User;
import com.seoro.seoro.repository.Group.GroupRepository;
import com.seoro.seoro.repository.User.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService{
	private final GroupRepository groupRepository;
	private final UserRepository userRepository;
	private final ChatRepository chatRepository;

	@Override
	public GroupMainResponseDto groupMain(String userName) {
		GroupMainResponseDto groupMainResponseDto = new GroupMainResponseDto();


		return groupMainResponseDto;
	}

	@Override
	public ResultResponseDto makeGroup(GroupSignupRequestDto requestDto) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();
		Groups savegroup = new Groups();
		boolean online = false;
		if(requestDto.getGroupDongCode().equals("")) {
			online = true;
		}

		User host = new User();
		Optional<User> tmpUser = userRepository.findById(requestDto.getGroupHost());
		if(tmpUser.isPresent()) {
			host = tmpUser.get();
		}else {
			host = tmpUser.orElse(null);
			resultResponseDto.setResult(false);
			return resultResponseDto;
		}

		savegroup = Groups.builder()
			.groupName(requestDto.getGroupName())
			.host(host)
			.groupCapacity(requestDto.getGroupCapacity())
			.gropuDongCode(requestDto.getGroupDongCode())
			.groupProfile(requestDto.getGroupProfile())
			.groupIntroduction(requestDto.getGroupIntroduction())
			.groupStartDate(requestDto.getGroupStartDate())
			.groupEndDate(requestDto.getGroupEndDate())
			.isOnline(online)
			.build();

		groupRepository.save(savegroup);
		resultResponseDto.setResult(true);
		return resultResponseDto;
	}

	@Override
	public GroupDetailResponseDto groupDetail(Long groupId) {
		GroupDetailResponseDto groupDetailResponseDto = new GroupDetailResponseDto();
		Groups group = new Groups();
		Optional<Groups> findGroup = groupRepository.findById(groupId);
		if(findGroup.isPresent()) {
			group = findGroup.get();
		} else {
			group = findGroup.orElse(null);
		}
		if(group == null) {
			groupDetailResponseDto.setResult(false);
			return groupDetailResponseDto;
		}

//		ChatRoom chatRoom = new ChatRoom();
//		Optional<ChatRoom> findChatRoom = chatRepository.findById(group.getGroupChatId());
//		if(findChatRoom.isPresent()) {
//			chatRoom = findChatRoom.get();
//		} else {
//			chatRoom = findChatRoom.orElse(null);
//		}

		groupDetailResponseDto = GroupDetailResponseDto.builder()
				.result(true)
				.groupName(group.getGroupName())
				.groupStartDate(group.getGroupStartDate())
				.groupEndDate(group.getGroupEndDate())
				.groupDongCode(group.getGropuDongCode())
				.groupCapacity(group.getGroupCapacity())
				.groupDescrib(group.getGroupIntroduction())
				.groupPost(group.getPosts())
				.books(group.getBooks())
//				.chatting(chatRoom.getContents())
				.postCount(group.getPosts().size())
				.meetingCount(group.getMeetings().size())
				.build();

		return groupDetailResponseDto;
	}
}
