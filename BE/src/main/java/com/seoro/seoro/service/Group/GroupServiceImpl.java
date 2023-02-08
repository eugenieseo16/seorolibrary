package com.seoro.seoro.service.Group;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.swing.*;

import com.seoro.seoro.domain.dto.Group.GroupApplyReadResponseDto;
import com.seoro.seoro.domain.dto.Group.GroupApplyUserDto;
import com.seoro.seoro.domain.dto.Group.GroupDetailResponseDto;
import com.seoro.seoro.domain.dto.Group.GroupMainResponseDto;
import com.seoro.seoro.domain.entity.Groups.GroupApply;
import com.seoro.seoro.domain.entity.Groups.GroupJoin;
import com.seoro.seoro.repository.ChatRoom.ChatRoomRepository;

import com.seoro.seoro.repository.Group.GroupApplyRepository;
import com.seoro.seoro.repository.Group.GroupJoinRepository;
import com.seoro.seoro.service.GroupPost.GroupPostService;

import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Group.GroupSignupRequestDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.domain.entity.Groups.Groups;
import com.seoro.seoro.domain.entity.Member.Member;
import com.seoro.seoro.repository.Group.GroupRepository;
import com.seoro.seoro.repository.Member.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService{
	private final GroupApplyRepository groupApplyRepository;
	private final GroupRepository groupRepository;
	private final GroupJoinRepository groupJoinRepository;
	private final UserRepository userRepository;
	private final ChatRoomRepository chatRepository;
	private final GroupPostService groupPostService;


	@Override
	public GroupMainResponseDto groupMain(String userName) {
		GroupMainResponseDto groupMainResponseDto = new GroupMainResponseDto();
		System.out.println("userName = " + userName);
		//현재 로그인한 사용자
		Member findMember = userRepository.findUserByMemberName(userName);
		System.out.println("findUser = " + findMember);

		//같은 동코드를 가진 독서모임 반환
		// String myDongCode = findUser.getUserDongCode();
		// List<Groups> findMyDongGroups = groupRepository.findGroupsByGroupDongCode(myDongCode);
		// if(findMyDongGroups.size() > 0) {
		// 	groupMainResponseDto.setRecommendGroups(findMyDongGroups);
		// }

		//같은 동코드를 가진 사용자들 반환


		//내가 참여하고 있는 독서모임 반환
		List<GroupJoin> findGroupJoin = findMember.getGroupJoins();
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

		Member host = new Member();
		Optional<Member> tmpUser = userRepository.findById(requestDto.getGroupHost());
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
						.member(host)
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

		groupDetailResponseDto = GroupDetailResponseDto.builder()
				.result(true)
				.groupName(group.getGroupName())
				.groupStartDate(group.getGroupStartDate())
				.groupEndDate(group.getGroupEndDate())
				.groupDongCode(group.getGroupDongCode())
				.groupCapacity(group.getGroupCapacity())
				.groupDescrib(group.getGroupIntroduction())
				.bookCount(group.getBooks().size())
				.postCount(group.getPosts().size())
				.meetingCount(group.getMeetings().size())
				.build();

		return groupDetailResponseDto;
	}

	@Override
	public ResultResponseDto deleteGroup(Long groupId, Long userId) {
		ResultResponseDto responseDto = new ResultResponseDto();
		Member member = new Member();
		Optional<Member> tmpMember = userRepository.findById(userId);
		if(tmpMember.isPresent()) {
			member = tmpMember.get();
		} else {
			responseDto.setResult(false);
			return responseDto;
		}

		Optional<Groups> tmpGroup = groupRepository.findById(groupId);
		Groups group = new Groups();
		if(tmpGroup.isPresent()) {
			group = tmpGroup.get();
		}
		else {
			responseDto.setResult(false);
			return responseDto;
		}
		
		if(group.getHost().equals(member)) { //현재 사용자가 독서모임을 만든 사람이라면
			groupRepository.deleteById(groupId);
		}

		responseDto.setResult(true);
		return responseDto;
	}

	@Override
	public ResultResponseDto applyGroup(Long groupId, Long userId) {
		ResultResponseDto responseDto = new ResultResponseDto();
		Member member = new Member();
		Optional<Member> tmpMember = userRepository.findById(userId);
		if (tmpMember.isPresent()) {
			member = tmpMember.get();
		} else {
			responseDto.setResult(false);
			return responseDto;
		}

		Optional<Groups> tmpGroup = groupRepository.findById(groupId);
		Groups group = new Groups();
		if (tmpGroup.isPresent()) {
			group = tmpGroup.get();
		} else {
			responseDto.setResult(false);
			return responseDto;
		}

		GroupApply groupApply = GroupApply.builder()
			.groups(group)
			.member(member)
			.isDelete(false)
			.build();
		groupApplyRepository.save(groupApply);
		responseDto.setResult(true);
		return responseDto;
	}

	@Override
	public GroupApplyReadResponseDto readGroupApplies(Long groupId, Long userId) {
		GroupApplyReadResponseDto responseDto = new GroupApplyReadResponseDto();
		Member member = new Member();
		Optional<Member> tmpMember = userRepository.findById(userId);
		if (tmpMember.isPresent()) {
			member = tmpMember.get();
		} else {
			responseDto.setResult(false);
			return responseDto;
		}

		Optional<Groups> tmpGroup = groupRepository.findById(groupId);
		Groups group = new Groups();
		if (tmpGroup.isPresent()) {
			group = tmpGroup.get();
		} else {
			responseDto.setResult(false);
			return responseDto;
		}

		if(group.getHost().equals(member)) { //현재 사용자가 독서모임을 만든 사람이라면
			List<GroupApply> groupApplyList = groupApplyRepository.findByGroups(group);
			List<GroupApplyUserDto> applyUsers = new ArrayList<>();
			for(GroupApply apply : groupApplyList) {
				GroupApplyUserDto userDto = GroupApplyUserDto.builder()
					.userId(apply.getMember().getMemberId())
					.userName(apply.getMember().getMemberName())
					.build();
				applyUsers.add(userDto);
			}
			responseDto.setResult(true);
			responseDto.setGroupApplies(applyUsers);
			return responseDto;
		}
		else {
			responseDto.setResult(false);
			return responseDto;
		}
	}
}
