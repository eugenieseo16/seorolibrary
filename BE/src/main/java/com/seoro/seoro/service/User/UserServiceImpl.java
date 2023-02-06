package com.seoro.seoro.service.User;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.User.UserDto;
import com.seoro.seoro.domain.entity.User.User;
import com.seoro.seoro.repository.User.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	final UserRepository userRepository;


	@Override
	public List<UserDto> findByUserNameLike(String input) {
		List<User> list = userRepository.findByUserNameLike(input);
		List<UserDto> dtoList = new ArrayList<>();
		for(User user: list){
			dtoList.add(UserDto.builder()
					.userProfile(user.getUserProfile())
					.userEmail(user.getUserEmail())
					.userScore(user.getUserScore())
					.userDongCode(user.getUserDongCode())
					.userName(user.getUserName())
				.build());
		}
		return dtoList;
	}
}
