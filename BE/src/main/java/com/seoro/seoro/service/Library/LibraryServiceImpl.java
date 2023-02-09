package com.seoro.seoro.service.Library;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Book.BookReportDto;
import com.seoro.seoro.domain.dto.Book.OwnBookDetailDto;
import com.seoro.seoro.domain.dto.Book.OwnBookDto;
import com.seoro.seoro.domain.dto.Book.OwnCommentDto;
import com.seoro.seoro.domain.dto.Book.ReadBookDto;
import com.seoro.seoro.domain.dto.Book.ReviewDto;
import com.seoro.seoro.domain.dto.Group.GroupShowDto;
import com.seoro.seoro.domain.dto.Library.LibraryDto;
import com.seoro.seoro.domain.dto.Member.FriendDto;
import com.seoro.seoro.domain.dto.Member.MemberDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.domain.entity.Book.BookReport;
import com.seoro.seoro.domain.entity.Book.OwnBook;
import com.seoro.seoro.domain.entity.Book.ReadBook;
import com.seoro.seoro.domain.entity.Book.Review;
import com.seoro.seoro.domain.entity.Groups.GroupJoin;
import com.seoro.seoro.domain.entity.Groups.Groups;
import com.seoro.seoro.domain.entity.Member.Friend;
import com.seoro.seoro.domain.entity.Member.Member;
import com.seoro.seoro.repository.Book.BookReportRepository;
import com.seoro.seoro.repository.Book.OwnBookRepository;
import com.seoro.seoro.repository.Book.ReadBookRepository;
import com.seoro.seoro.repository.Member.FriendRepository;
import com.seoro.seoro.repository.Member.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class LibraryServiceImpl implements LibraryService {
	private final BookReportRepository bookReportRepository;
	private final ReadBookRepository readBookRepository;
	private final OwnBookRepository ownBookRepository;
	private final MemberRepository memberRepository;
	private final FriendRepository friendRepository;

	@Override
	public LibraryDto libraryMain(Long memberId) {
		LibraryDto responseDto = new LibraryDto();
		Member member = memberRepository.findById(memberId).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));

		// 본인 여부
		// 토큰 정보 비교로 수정
		boolean isOwn;
		Member me = null;
		if(memberId.equals(member.getMemberId())) {
			isOwn = true;
		} else {
			isOwn = false;
		}
		responseDto.setOwn(isOwn);

		// 프로필
		responseDto.setMemberInfo(new MemberDto(member));

		// 참여 모임
		List<GroupShowDto> groupShowDto = getMyGroups(memberId);
		responseDto.setMyGroups(groupShowDto);

		// 보유 도서
		List<OwnBookDto> ownBookDtoList = getOwnBookList(member);
		responseDto.setMyOwnBooks(ownBookDtoList);

		// 읽은 도서
		List<ReadBook> readBooks = member.getReadBooks();
		List<ReadBookDto> readBookDtoList = new ArrayList<>();
		for(ReadBook readBook : readBooks) {
			readBookDtoList.add(new ReadBookDto(readBook));
		}
		responseDto.setMyReadBooks(readBookDtoList);

		// 한줄평 카운트
		Long countOwnComment = ownBookRepository.countByMember(member);
		responseDto.setMyOwnComment(countOwnComment);

		// 리뷰 카운트
		Long countReview = readBookRepository.countByMember(member);
		responseDto.setMyReview(countReview);

		// 빌린 도서
		// 채팅방 api 완성 후 추가

		// 팔로워 명수
		Long countFollower = friendRepository.countByFollowing(member);
		responseDto.setMyFollowers(countFollower);

		// 팔로잉 명수
		Long countFollowing = friendRepository.countByFollower(member);
		responseDto.setMyFollowings(countFollowing);

		// 팔로잉 여부
		boolean isFollowing;
		if(!isOwn) {
			// 팔로잉에 유저 아이디 팔로워에 내 아이디면 팔로잉한 유저
			Optional<Friend> friend = friendRepository.findByFollowerAndFollowing(me, memberId);
			if(friend.isPresent()) {
				isFollowing = true;
			} else {
				isFollowing = false;
			}
		} else {
			isFollowing = false;
		}
		responseDto.setFollowing(isFollowing);

		return responseDto;
	}

	private List<OwnBookDto> getOwnBookList(Member member) {
		List<OwnBook> ownBooks = member.getOwnBooks();
		List<OwnBookDto> ownBookDtoList = new ArrayList<>();
		for(OwnBook ownBook : ownBooks) {
			ownBookDtoList.add(new OwnBookDto(ownBook));
		}
		return ownBookDtoList;
	}

	@Override
	public OwnBookDetailDto viewOwnBookDetail(String isbn) throws IOException, ParseException {
		// viewBookDetail
		// set한줄평 다른보유도서

		return null;
	}

	@Override
	public List<GroupShowDto> viewMyGroup(Long memberId) {
		return getMyGroups(memberId);
	}

	private List<GroupShowDto> getMyGroups(Long memberId) {
		Member member = memberRepository.findById(memberId).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));

		List<GroupShowDto> groupShowDto = new ArrayList<>();
		List<GroupJoin> findGroupJoin = member.getGroupJoins();
		for(GroupJoin groupJoin : findGroupJoin) {
			Groups groups = groupJoin.getGroups();
			groupShowDto.add(GroupShowDto.builder()
				.groupProfile(groups.getGroupProfile())
				.groupDescrib(groups.getGroupIntroduction())
				.groupName(groups.getGroupName())
				.build());
		}

		return groupShowDto;
	}

	@Override
	public OwnBookDto makeOwnBookWithIsbn(Long memberId, Long isbn) {
		// 바코드로 등록

		return null;
	}

	@Override
	public OwnBookDto makeOwnBookWithSearch(Long memberId, Long isbn) {
		// 검색으로 등록

		return null;
	}

	@Override
	public ResultResponseDto deleteOwnBook(Long memberId, String isbn) {
		OwnBook ownBook = ownBookRepository.findByIsbn(isbn).orElseThrow(() -> new NoSuchElementException("해당 isbn의 책이 없습니다."));
		ownBookRepository.delete(ownBook);
		return new ResultResponseDto(true);
	}

	@Override
	public ResultResponseDto deleteReadBook(Long memberId, String isbn) {
		ReadBook readBook = readBookRepository.findByIsbn(isbn).orElseThrow(() -> new NoSuchElementException("해당 isbn의 책이 없습니다."));
		readBookRepository.delete(readBook);
		return new ResultResponseDto(true);
	}

	@Override
	public List<OwnCommentDto> viewMyComment(Long memberId) {
		Member member = memberRepository.findById(memberId).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));

		List<OwnBook> ownBooks = member.getOwnBooks();
		List<OwnCommentDto> commentDtoList = new ArrayList<>();
		for(OwnBook ownBook : ownBooks) {
			commentDtoList.add(new OwnCommentDto(ownBook));
		}

		return commentDtoList;
	}

	@Override
	public List<ReviewDto> viewMyReview(Long memberId) {
		Member member = memberRepository.findById(memberId).orElseThrow(() -> new NoSuchElementException("회원이 없습니다."));

		List<Review> reviews = member.getReviews();
		List<ReviewDto> reviewDtoList = new ArrayList<>();
		for(Review review : reviews) {
			reviewDtoList.add(new ReviewDto(review));
		}

		return reviewDtoList;
	}

	@Override
	public List<BookReportDto> viewBookReportList(Long memberId) {
		Member member = memberRepository.findById(memberId).orElseThrow(() -> new NoSuchElementException("회원이 존재하지 않습니다."));

		List<BookReportDto> bookReportList = new ArrayList<>();

		List<ReadBook> readBooks = member.getReadBooks(); // 유저가 읽은 책 리스트
		List<BookReport> bookReports = new ArrayList<>();
		for(ReadBook readBook : readBooks) {
			// 구현
		}

		return bookReportList;
	}

	@Override
	public ResultResponseDto makeBookReport(BookReportDto requestDto, Long memberId) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();

		BookReport bookReport = new BookReport();
		ReadBook readBook = new ReadBook();
		readBook = readBookRepository.findByReadBookId(requestDto.getReadBookId()).get();
		Member nowMember = memberRepository.findById(memberId).get();

		// 이미지 저장 추가

		bookReport = BookReport.builder()
			.readBook(readBook)
			.member(nowMember)
			.bookReportTitle(requestDto.getBookReportTitle())
			.bookReportContent(requestDto.getBookReportContent())
			.build();

		bookReportRepository.save(bookReport);
		resultResponseDto.setResult(true);

		return resultResponseDto;
	}

	@Override
	public BookReportDto viewBookReport(Long bookReportId) {
		Optional<BookReport> bookReport = bookReportRepository.findById(bookReportId);
		BookReport responseBookReport = bookReport.get();

		BookReportDto responsetDto = new BookReportDto
			(responseBookReport.getReadBook().getReadBookId(), responseBookReport.getBookReportTitle(), responseBookReport.getBookReportContent());

		return responsetDto;
	}

	@Override
	public ResultResponseDto modifyBookReport(BookReportDto requestDto, Long bookReportId) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();

		Optional<BookReport> bookReport = bookReportRepository.findById(bookReportId);
		if(bookReport.isPresent()) {
			BookReport newBookReport = bookReport.get();

			// 이미지 수정 추가

			newBookReport = BookReport.builder()
				.bookReportId(bookReportId)
				.readBook(newBookReport.getReadBook())
				.bookReportTitle(requestDto.getBookReportTitle())
				.bookReportContent(requestDto.getBookReportContent())
				.build();

			bookReportRepository.save(newBookReport);
			resultResponseDto.setResult(true);
		}

		return resultResponseDto;
	}

	@Override
	public ResultResponseDto removeBookReport(Long bookReportId) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();

		Optional<BookReport> bookReport = bookReportRepository.findById(bookReportId);
		if(bookReport.isPresent()) {
			bookReportRepository.delete(bookReport.get());
			resultResponseDto.setResult(true);
		}

		return resultResponseDto;
	}

	@Override
	public LibraryDto makeFriend(Long memberId) {
		LibraryDto responseDto = libraryMain(memberId);

		// jwt 토큰 정보
		String email = null;
		Member member = memberRepository.findByMemberEmail(email).get();

		Friend friend = Friend.builder()
			.follower(member)
			.following(memberId)
			.build();
		friendRepository.save(friend);
		responseDto.setMyFollowings(responseDto.getMyFollowers() + 1);

		return responseDto;
	}

	@Override
	public LibraryDto deleteFriend(Long memberId) {
		LibraryDto responseDto = libraryMain(memberId);

		// jwt 토큰 정보
		String email = null;
		Member member = memberRepository.findByMemberEmail(email).get();

		Friend friend = friendRepository.findByFollowerAndFollowing(member, memberId).orElseThrow(() -> new NoSuchElementException("친구가 아닙니다"));

		friendRepository.delete(friend);
		responseDto.setMyFollowings(responseDto.getMyFollowers() - 1);

		return responseDto;
	}

	@Override
	public List<FriendDto> viewFriendList(Long memberId) {
		Member member = memberRepository.findById(memberId).orElseThrow(() -> new NoSuchElementException("회원이 존재하지 않습니다."));

		List<FriendDto> friendDtoList = new ArrayList<>();
		List<Friend> friends = member.getFriends();
		for(Friend friend : friends) {
			friendDtoList.add(new FriendDto(friend));
		}

		return friendDtoList;
	}
}
