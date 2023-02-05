package com.seoro.seoro.service.User;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Book.BookDto;
import com.seoro.seoro.domain.dto.Book.OwnBookDto;
import com.seoro.seoro.domain.dto.Book.ReviewDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.domain.dto.User.UserDto;
import com.seoro.seoro.domain.entity.Book.Book;
import com.seoro.seoro.domain.entity.Book.OwnBook;
import com.seoro.seoro.domain.entity.Book.Review;
import com.seoro.seoro.domain.entity.User.User;
import com.seoro.seoro.repository.Book.BookRepository;
import com.seoro.seoro.repository.Book.OwnBookRepository;
import com.seoro.seoro.repository.Book.ReviewRepository;
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
