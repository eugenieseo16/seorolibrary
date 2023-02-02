package com.seoro.seoro.service.Library;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.Book.OwnBookDto;
import com.seoro.seoro.domain.dto.Library.BookReportDto;
import com.seoro.seoro.domain.dto.Library.LibraryMainResponseDto;
import com.seoro.seoro.domain.dto.Library.ReviewDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.domain.dto.User.UserDto;
import com.seoro.seoro.domain.dto.User.UserProfileDto;
import com.seoro.seoro.domain.entity.Book.OwnBook;
import com.seoro.seoro.domain.entity.User.Friend;
import com.seoro.seoro.domain.entity.User.User;
import com.seoro.seoro.repository.Book.BookRepository;
import com.seoro.seoro.repository.Group.GroupApplyRepository;
import com.seoro.seoro.repository.Group.GroupRepository;
import com.seoro.seoro.repository.Library.LibraryRepository;
import com.seoro.seoro.repository.User.FriendRepository;
import com.seoro.seoro.repository.User.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class LibraryServiceImpl implements LibraryService {
	private final LibraryRepository libraryRepository;
	private final GroupApplyRepository groupApplyRepository;
	private final UserRepository userRepository;
	private final BookRepository bookRepository;
	private final FriendRepository friendRepository;

	@Override
	public LibraryMainResponseDto libraryMain(Long userId) {
		LibraryMainResponseDto libraryMainResponseDto = new LibraryMainResponseDto();

		UserProfileDto userProfile = new UserProfileDto();

		Optional<User> user = userRepository.findById(userId);
		Long myFollowerCnt = friendRepository.coundByuserId(userId);
		Long myFollowing = 0L; // 수정 필요

		userProfile = UserProfileDto.builder()
			.userId(user.get().getUserId())
			.userName(user.get().getUserName())
			.userProfile(user.get().getUserProfile())
			.userDongCode(user.get().getUserDongCode())
			.userScore(user.get().getUserScore())
			.followerCnt(myFollowerCnt).followingCnt(myFollowing)
			.build();

		libraryMainResponseDto.setUserProfile(userProfile);

		Long myGroups = groupApplyRepository.countByuserId(userId);
		libraryMainResponseDto.setGroupCnt(myGroups.intValue());

		return libraryMainResponseDto;
	}

	@Override
	public ResultResponseDto modifyUserProfile(UserProfileDto requestDto) {
		return null;
	}

	@Override
	public ResultResponseDto remeveUser(Long userId) {
		return null;
	}

	@Override
	public ResultResponseDto modifyOwnComment(OwnBook requestDto) {
		return null;
	}

	@Override
	public ResultResponseDto modifyReview(ReviewDto requestDto) {
		return null;
	}

	@Override
	public ResultResponseDto removeReview(Long reviewId) {
		return null;
	}

	@Override
	public ResultResponseDto makeOwnBook(OwnBookDto requestDto) {
		return null;
	}

	@Override
	public ResultResponseDto removeOwnBook(Long ownBookId) {
		return null;
	}

	@Override
	public ResultResponseDto makeBookReport(BookReportDto requestDto) {
		return null;
	}

	@Override
	public ResultResponseDto modifyBookReport(BookReportDto requestDto) {
		return null;
	}

	@Override
	public ResultResponseDto removeBookReport(Long bookReportId) {
		return null;
	}
}
