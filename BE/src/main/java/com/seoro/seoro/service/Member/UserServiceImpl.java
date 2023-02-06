package com.seoro.seoro.service.Member;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Member.UserDto;
import com.seoro.seoro.domain.entity.Member.Member;
import com.seoro.seoro.repository.Member.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	final UserRepository userRepository;


	@Override
	public List<UserDto> findByMemberNameLike(String input) {
		List<Member> list = userRepository.findByMemberNameLike(input);
		System.out.println(list.size());
		List<UserDto> dtoList = new ArrayList<>();
		for(Member member : list){
			dtoList.add(UserDto.builder()
					.userProfile(member.getMemberProfile())
					.userEmail(member.getMemberEmail())
					.userScore(member.getMemberScore())
					.userDongCode(member.getMemberDongCode())
					.userName(member.getMemberName())
				.build());
		}
		return dtoList;
	}
}
