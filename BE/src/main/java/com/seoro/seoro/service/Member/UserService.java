package com.seoro.seoro.service.Member;

import java.util.List;

import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Member.UserDto;

@Service
public interface UserService {
	List<UserDto> findByUserNameLike(String userName);
}
