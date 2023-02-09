package com.seoro.seoro.service.Group;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import javax.swing.*;

import com.seoro.seoro.domain.dto.Group.GroupApplyReadResponseDto;
import com.seoro.seoro.domain.dto.Group.GroupApplyUserDto;
import com.seoro.seoro.domain.dto.Group.GroupApproveRequestDto;
import com.seoro.seoro.domain.dto.Group.GroupDetailResponseDto;
import com.seoro.seoro.domain.dto.Group.GroupMainResponseDto;
import com.seoro.seoro.domain.dto.Group.GroupMemberDto;
import com.seoro.seoro.domain.dto.Group.GroupMemberReadResponseDto;
import com.seoro.seoro.domain.entity.Groups.GroupApply;
import com.seoro.seoro.domain.dto.Group.GroupShowDto;
import com.seoro.seoro.domain.dto.Member.RecommendMemberDto;
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
import com.seoro.seoro.repository.Member.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService{
	private final GroupApplyRepository groupApplyRepository;
	private final GroupRepository groupRepository;
	private final GroupJoinRepository groupJoinRepository;
	private final ChatRoomRepository chatRepository;
	private final MemberRepository memberRepository;
	private final GroupPostService groupPostService;


	@Override
	public GroupMainResponseDto groupMain(String userName) {
		GroupMainResponseDto groupMainResponseDto = new GroupMainResponseDto();
		System.out.println("userName = " + userName);
		//현재 로그인한 사용자
		Member findMember = memberRepository.findByMemberName(userName).get();
		System.out.println("findUser = " + findMember);

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
		List<Member> dongMember = memberRepository.findByMemberDongCode(myDongCode);
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
		Optional<Member> tmpUser = memberRepository.findById(requestDto.getGroupHost());
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
		Optional<Member> tmpMember = memberRepository.findById(userId);
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
		Optional<Member> tmpMember = memberRepository.findById(userId);
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
		Optional<Member> tmpMember = memberRepository.findById(userId);
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
				if(!apply.getIsDelete()) { //승인, 거부 안한 사용자만 뜨게
					GroupApplyUserDto userDto = GroupApplyUserDto.builder()
						.groupApplyId(apply.getGroupAplyId())
						.userId(apply.getMember().getMemberId())
						.userName(apply.getMember().getMemberName())
						.build();
					applyUsers.add(userDto);	
				}
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

	@Override
	public ResultResponseDto approveGroupApply(GroupApproveRequestDto requestDto) {
		ResultResponseDto responseDto = new ResultResponseDto();
		
		//Host 정보 가져오기
		Member member = new Member();
		Optional<Member> tmpMember = memberRepository.findById(requestDto.getUserId());
		if (tmpMember.isPresent()) {
			member = tmpMember.get();
		} else {
			responseDto.setResult(false);
			return responseDto;
		}
		//신청자 정보 가져오기
		Member applyMember = new Member();
		Optional<Member> tmpApplyMember = memberRepository
			.findById(requestDto.getApplyUserId());
		if (tmpApplyMember.isPresent()) {
			applyMember = tmpApplyMember.get();
		} else {
			responseDto.setResult(false);
			return responseDto;
		}
		//독서 모임 정보 가져오기
		Optional<Groups> tmpGroup = groupRepository.findById(requestDto.getGroupId());
		Groups group = new Groups();
		if (tmpGroup.isPresent()) {
			group = tmpGroup.get();
		} else {
			responseDto.setResult(false);
			return responseDto;
		}
		//독서 모임 참여 신청 정보 가져오기
		Optional<GroupApply> tmpGroupApply = groupApplyRepository.findById(requestDto.getGroupApplyId());
		GroupApply groupApply = new GroupApply();
		if (tmpGroupApply.isPresent()) {
			groupApply = tmpGroupApply.get();
		} else {
			responseDto.setResult(false);
			return responseDto;
		}

		if(group.getHost().equals(member)) { //방장이 맞으면
			if(requestDto.getIsApprove()) { //승인
				GroupJoin join = GroupJoin.builder()
					.groups(group)
					.member(applyMember)
					.build();
				groupJoinRepository.save(join);
			}
			GroupApply done = GroupApply.builder()
				.groupAplyId(groupApply.getGroupAplyId())
				.groups(group)
				.isDelete(true)
				.member(applyMember)
				.build();
			groupApplyRepository.save(done); //처리 완료
		}
		responseDto.setResult(true);
		return responseDto;
	}

	@Override
	public GroupMemberReadResponseDto readGroupMembers(Long groupId) {
		GroupMemberReadResponseDto responseDto = new GroupMemberReadResponseDto();
		//독서 모임 정보 가져오기
		Optional<Groups> tmpGroup = groupRepository.findById(groupId);
		Groups group = new Groups();
		if (tmpGroup.isPresent()) {
			group = tmpGroup.get();
		} else {
			responseDto.setResult(false);
			return responseDto;
		}

		List<GroupJoin> findGroupJoins = groupJoinRepository.findByGroups(group);
		List<GroupMemberDto> members = new ArrayList<>();
		//방장 맨 처음에 넣기
		GroupMemberDto hostDto = GroupMemberDto.builder()
			.userId(group.getHost().getMemberId())
			.userName(group.getHost().getMemberName())
			.build();
		members.add(hostDto);
		for(GroupJoin join : findGroupJoins) {
			if(!join.getMember().equals(group.getHost())) {
				GroupMemberDto memberDto = GroupMemberDto.builder()
					.userId(join.getMember().getMemberId())
					.userName(join.getMember().getMemberName())
					.build();
				members.add(memberDto);
			}
		}
		responseDto.setResult(true);
		responseDto.setGroupMembers(members);
		return responseDto;
	}
}
