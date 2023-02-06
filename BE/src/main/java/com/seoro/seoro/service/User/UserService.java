package com.seoro.seoro.service.User;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.domain.dto.User.UserDto;
import com.seoro.seoro.domain.entity.User.User;

@Service
public interface UserService {
	List<UserDto> findByUserNameLike(String userName);
}
