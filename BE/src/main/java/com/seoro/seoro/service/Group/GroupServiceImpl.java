package com.seoro.seoro.service.Group;

import java.util.Optional;

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

	@Override
	public ResultResponseDto makeGroup(GroupSignupRequestDto requestDto) {
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
		ResultResponseDto resultResponseDto = new ResultResponseDto();
		resultResponseDto.setResult(true);
		return resultResponseDto;
	}
}
