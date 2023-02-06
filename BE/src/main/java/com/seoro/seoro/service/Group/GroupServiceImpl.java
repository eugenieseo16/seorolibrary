package com.seoro.seoro.service.Group;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.seoro.seoro.domain.dto.Group.GroupDetailResponseDto;
import com.seoro.seoro.domain.dto.Group.GroupMainResponseDto;
import com.seoro.seoro.domain.dto.GroupPost.GroupPostDto;
import com.seoro.seoro.domain.entity.ChatRoom.ChatRoom;
import com.seoro.seoro.domain.entity.Groups.GroupJoin;
import com.seoro.seoro.domain.entity.Groups.GroupPost;
import com.seoro.seoro.repository.ChatRoom.ChatRepository;

import com.seoro.seoro.repository.Group.GroupJoinRepository;
import com.seoro.seoro.service.GroupPost.GroupPostService;
import org.springframework.beans.factory.annotation.Autowired;
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
	private final GroupJoinRepository groupJoinRepository;
	private final UserRepository userRepository;
	private final ChatRepository chatRepository;
	private final GroupPostService groupPostService;


	@Override
	public GroupMainResponseDto groupMain(String userName) {
		GroupMainResponseDto groupMainResponseDto = new GroupMainResponseDto();
		System.out.println("userName = " + userName);
		//현재 로그인한 사용자
		User findUser = userRepository.findUserByUserName(userName);
		System.out.println("findUser = " + findUser);

		//같은 동코드를 가진 독서모임 반환
		// String myDongCode = findUser.getUserDongCode();
		// List<Groups> findMyDongGroups = groupRepository.findGroupsByGroupDongCode(myDongCode);
		// if(findMyDongGroups.size() > 0) {
		// 	groupMainResponseDto.setRecommendGroups(findMyDongGroups);
		// }

		//같은 동코드를 가진 사용자들 반환


		//내가 참여하고 있는 독서모임 반환
		List<GroupJoin> findGroupJoin = findUser.getGroupJoins();
		System.out.println("findGroupJoin = " + findGroupJoin.size());
		// for (int i=0; i<findGroupJoin.size(); i++) {
		// 	System.out.println(findGroupJoin.get(i));
		// }
		List<GroupDetailResponseDto> myGroups = new ArrayList<>();
		for (GroupJoin groupJoin : findGroupJoin) {
			Groups groups = groupJoin.getGroups();
			myGroups.add(groupDetail(groups.getGroupId()));

		}

		if(myGroups.size() > 0) {
			groupMainResponseDto.setMyGroups(myGroups);
		}
		// groupMainResponseDto.setMyGroups(findGroupJoin);
		groupMainResponseDto.setResult(true);
		return groupMainResponseDto;
	}

	@Override
	public ResultResponseDto makeGroup(GroupSignupRequestDto requestDto) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();
		Groups saveGroup = new Groups();
		GroupJoin saveGroupJoin = new GroupJoin();
		boolean online = false;
		if(requestDto.getGroupDongCode() == null) {
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

		saveGroup = Groups.builder()
			.groupName(requestDto.getGroupName())
			.host(host)
			.groupCapacity(requestDto.getGroupCapacity())
			.groupDongCode(requestDto.getGroupDongCode())
			.groupProfile(requestDto.getGroupProfile())
			.groupIntroduction(requestDto.getGroupIntroduction())
			.groupStartDate(requestDto.getGroupStartDate())
			.groupEndDate(requestDto.getGroupEndDate())
			.isOnline(online)
			.build();

		saveGroupJoin = GroupJoin.builder()
						.groups(saveGroup)
						.user(host)
						.build();

		groupRepository.save(saveGroup);
		groupJoinRepository.save(saveGroupJoin);
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
			groupDetailResponseDto.setResult(false);
			return groupDetailResponseDto;
		}

		//그룹의 게시글들 가져오기
		List<GroupPost> posts = group.getPosts();
		List<GroupPostDto> groupPost = new ArrayList<>();
		for(GroupPost p : posts) {
			GroupPostDto gpd = GroupPostDto.builder()
					.postId(p.getGroupPostId())
					.postTitle(p.getGroupPostTitle())
					.postTime(p.getGroupPostTime())
					.postCategory(p.getPostCategory().toString())
					.userName(p.getUser().getUserName())
					.build();
			groupPost.add(gpd);
		}

		groupDetailResponseDto = GroupDetailResponseDto.builder()
				.result(true)
				.groupName(group.getGroupName())
				.groupStartDate(group.getGroupStartDate())
				.groupEndDate(group.getGroupEndDate())
				.groupDongCode(group.getGroupDongCode())
				.groupCapacity(group.getGroupCapacity())
				.groupDescrib(group.getGroupIntroduction())
				// .groupPost(group.getPosts())
				// .books(group.getBooks())
//				.chatting(chatRoom.getContents())
				.groupPost(groupPost)
				.bookCount(group.getBooks().size())
				.postCount(group.getPosts().size())
				.meetingCount(group.getMeetings().size())
				.build();

		return groupDetailResponseDto;
	}
}
