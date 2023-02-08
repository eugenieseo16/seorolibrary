package com.seoro.seoro.service.Group;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import com.seoro.seoro.domain.dto.Group.GroupDetailResponseDto;
import com.seoro.seoro.domain.dto.Group.GroupMainResponseDto;
import com.seoro.seoro.domain.dto.Group.GroupShowDto;
import com.seoro.seoro.domain.dto.Member.RecommendMemberDto;
import com.seoro.seoro.domain.entity.Groups.GroupJoin;
import com.seoro.seoro.repository.ChatRoom.ChatRoomRepository;

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
		Member findMember = userRepository.findByMemberName(userName);
		System.out.println("findMember = " + findMember);

		//내 동코드와 장르를 받아옴
		String myDongCode = findMember.getMemberDongCode();
		Long myGenre = findMember.getMemberGenre();

		//같은 동코드를 가진 독서모임 추천순으로 반환
		List<Groups> dongGroups = groupRepository.findGroupsByGroupDongCode(myDongCode);
		if(dongGroups.size() > 0) {
			Collections.sort(dongGroups, new Comparator<Groups>(){
				@Override
				public int compare(Groups o1, Groups o2) {
					Long o1_genre = o1.getGroupGenre();
					Long o2_genre = o2.getGroupGenre();
					if(Long.bitCount(o1_genre&myGenre) == Long.bitCount(o2_genre&myGenre)){
						return (int)(Long.bitCount(o1_genre)-Long.bitCount(o2_genre));
					}
					return (int)(Long.bitCount(o2_genre&myGenre)-Long.bitCount(o1_genre&myGenre));
				}
			});
			List<GroupShowDto> recommendGroups = new ArrayList<>();
			for(Groups group : dongGroups){
				if((group.getGroupGenre()&myGenre)==0){
					break;
				}
				recommendGroups.add(GroupShowDto.builder()
						.groupName(group.getGroupName())
						.groupDescrib(group.getGroupIntroduction())
						.groupProfile(group.getGroupProfile())
						.build());
			}
			groupMainResponseDto.setRecommendGroups(recommendGroups);
		}


		//같은 동코드를 가진 사용자들 추천순으로 반환
		List<Member> dongMember = userRepository.findByMemberDongCode(myDongCode);
		if(dongMember.size()>0){
			Collections.sort(dongMember, new Comparator<Member>(){
				@Override
				public int compare(Member o1, Member o2) {
					Long o1_genre = o1.getMemberGenre();
					Long o2_genre = o2.getMemberGenre();
					if(Long.bitCount(o1_genre&myGenre) == Long.bitCount(o2_genre&myGenre)){
						return (int)(Long.bitCount(o1_genre)-Long.bitCount(o2_genre));
					}
					return (int)(Long.bitCount(o2_genre&myGenre)-Long.bitCount(o1_genre&myGenre));
				}
			});
			List<RecommendMemberDto> recommendMembers = new ArrayList<>();
			for(Member member : dongMember){
				if(member.getMemberName().equals(userName)) continue;
				if((member.getMemberGenre()&myGenre)==0){
					break;
				}
				recommendMembers.add(RecommendMemberDto.builder()
					.memberProfile(member.getMemberProfile())
					.memberName(member.getMemberName())
					.build());
			}
			groupMainResponseDto.setRecommendMembers(recommendMembers);
		}

		//내가 참여하고 있는 독서모임 반환
		List<GroupJoin> findGroupJoin = findMember.getGroupJoins();
		System.out.println("findGroupJoin = " + findGroupJoin.size());
		// for (int i=0; i<findGroupJoin.size(); i++) {
		// 	System.out.println(findGroupJoin.get(i));
		// }
		List<GroupShowDto> myGroups = new ArrayList<>();
		for (GroupJoin groupJoin : findGroupJoin) {
			Groups groups = groupJoin.getGroups();
			myGroups.add(GroupShowDto.builder()
					.groupProfile(groups.getGroupProfile())
					.groupDescrib(groups.getGroupIntroduction())
					.groupName(groups.getGroupName())
				.build());
		}
		if(myGroups.size() > 0) {
			groupMainResponseDto.setMyGroups(myGroups);
		}

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
}
