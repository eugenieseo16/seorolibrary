package com.seoro.seoro.service.Library;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Book.BookReportDto;
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
import com.seoro.seoro.domain.entity.Book.BookReportPhoto;
import com.seoro.seoro.domain.entity.Book.OwnBook;
import com.seoro.seoro.domain.entity.Book.ReadBook;
import com.seoro.seoro.domain.entity.Book.Review;
import com.seoro.seoro.domain.entity.Groups.GroupJoin;
import com.seoro.seoro.domain.entity.Groups.Groups;
import com.seoro.seoro.domain.entity.Member.Friend;
import com.seoro.seoro.domain.entity.Member.Member;
import com.seoro.seoro.repository.Book.BookReportPhotoRepository;
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
	private final BookReportPhotoRepository bookReportPhotoRepository;
	private final ReadBookRepository readBookRepository;
	private final OwnBookRepository ownBookRepository;
	private final MemberRepository memberRepository;
	private final FriendRepository friendRepository;
	@Override
	public LibraryDto libraryMain(Long memberId, Long meId) {
		log.info("memberId: " + memberId + " meId: " + meId);

		LibraryDto responseDto = new LibraryDto();
		Member member = memberRepository.findById(memberId).orElse(null);
		Member me = memberRepository.findById(meId).orElse(null);

		if(member == null || me == null) {
			responseDto.setMessege("찾는 회원이 없습니다.");
			return responseDto;
		}

		// 본인 도서관 확인
		boolean isOwn;
		if(memberId.equals(meId)) {
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
		List<ReadBookDto> readBookDtoList = getReadBookList(member);
		responseDto.setMyReadBooks(readBookDtoList);

		// 한줄평 카운트
		Long countOwnComment = ownBookRepository.countByMember(member);
		responseDto.setMyOwnComment(countOwnComment);

		// 리뷰 카운트
		Long countReview = readBookRepository.countByMember(member);
		responseDto.setMyReview(countReview);

		// 빌린 도서 // 채팅 api 선행

		// 팔로워 명수
		// 확인 필요
		Long countFollower = friendRepository.countByFollowing(member.getMemberId());
		responseDto.setMyFollowers(countFollower);

		// 팔로잉 명수
		// 확인 필요
		Long countFollowing = friendRepository.countByFollower(member);
		responseDto.setMyFollowings(countFollowing);

		// 팔로잉 여부
		boolean isFollowing;
		if(!isOwn) {
			// 팔로잉에 유저 아이디 팔로워에 내 아이디면 팔로잉한 유저
			Friend friend = friendRepository.findByFollowerAndFollowing(me, memberId).orElse(null);
			if(friend != null) {
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

	@Override
	public List<OwnBookDto> viewMyOwnBook(Long memberId) {
		Member member = memberRepository.findByMemberId(memberId);
		if(member == null) {
			return new ArrayList<>();
		}

		List<OwnBookDto> ownBookDtoList = getOwnBookList(member);
		return ownBookDtoList;
	}

	@Override
	public List<ReadBookDto> viewMyReadBook(Long memberId) {
		Member member = memberRepository.findByMemberId(memberId);
		if(member == null) {
			return new ArrayList<>();
		}

		List<ReadBookDto> readBookDtoList = getReadBookList(member);
		return readBookDtoList;
	}

	@Override
	public List<GroupShowDto> viewMyGroup(Long memberId) {
		return getMyGroups(memberId);
	}

	@Override
	public ResultResponseDto makeOwnBook(Long memberId, OwnBookDto requestDto) {
		// 책 검색은 BookController의 api를 쓰고 한줄평을 포함한 등록만 LibraryController api 사용
		Member member = memberRepository.findById(memberId).orElse(null);
		ResultResponseDto responseDto = new ResultResponseDto();

		if(member == null) {
			responseDto.setResult(false);
			responseDto.setMessege("없는 회원입니다.");
			return responseDto;
		}

		OwnBook checkBook = ownBookRepository.findByMemberAndIsbn(member, requestDto.getIsbn()).orElse(null);
		if(checkBook != null) {
			responseDto.setResult(false);
			responseDto.setMessege("이미 등록된 도서입니다.");
			return responseDto;
		}

		OwnBook ownBook = OwnBook.builder()
			.member(member)
			.isbn(requestDto.getIsbn())
			.bookTitle(requestDto.getBookTitle())
			.bookImage(requestDto.getBookImage())
			.ownComment(requestDto.getOwnComment())
			.isOwn(true)
			.build();

		ownBookRepository.save(ownBook);
		responseDto.setResult(true);

		return responseDto;
	}

	@Override
	public ResultResponseDto removeOwnBook(Long memberId, String isbn) {
		ResultResponseDto responseDto = new ResultResponseDto();

		Member member = memberRepository.findByMemberId(memberId);
		if(member == null) {
			responseDto.setMessege("없는 회원입니다.");
			responseDto.setResult(false);
			return responseDto;
		}

		OwnBook ownBook = ownBookRepository.findByMemberAndIsbn(member, isbn).orElse(null);
		if(ownBook == null) {
			responseDto.setMessege("등록되지 않은 도서입니다.");
			responseDto.setResult(false);
			return responseDto;
		}

		ownBookRepository.delete(ownBook);
		responseDto.setResult(true);

		return responseDto;
	}

	@Override
	public ResultResponseDto removeReadBook(Long memberId, String isbn) {
		log.info("memberId: " + memberId);
		log.info("isbn: " + isbn);

		ResultResponseDto responseDto = new ResultResponseDto();

		Member member = memberRepository.findByMemberId(memberId);
		if(member == null) {
			responseDto.setMessege("없는 회원입니다.");
			responseDto.setResult(false);
			return responseDto;
		}

		ReadBook readBook = readBookRepository.findByIsbnAndMember(isbn, member).orElse(null);
		if(readBook == null) {
			responseDto.setMessege("등록되지 않은 도서입니다.");
			responseDto.setResult(false);
			return responseDto;
		}

		// 읽은 책과 연결된 리뷰와 독서기록이 모두 삭제 되어야지 삭제 가능

		readBookRepository.delete(readBook);
		responseDto.setResult(true);

		return responseDto;
	}

	@Override
	public List<OwnCommentDto> viewMyComment(Long memberId) {
		Member member = memberRepository.findById(memberId).orElse(null);

		if(member == null) {
			return new ArrayList<>();
		}

		List<OwnBook> ownBooks = member.getOwnBooks();
		List<OwnCommentDto> commentDtoList = new ArrayList<>();
		for(OwnBook ownBook : ownBooks) {
			commentDtoList.add(new OwnCommentDto(ownBook));
		}

		return commentDtoList;
	}

	@Override
	public List<ReviewDto> viewMyReview(Long memberId) {
		Member member = memberRepository.findById(memberId).orElse(null);

		if(member == null) {
			return new ArrayList<>();
		}

		List<Review> reviews = member.getReviews();
		List<ReviewDto> reviewDtoList = new ArrayList<>();
		for(Review review : reviews) {
			reviewDtoList.add(new ReviewDto(review));
		}

		return reviewDtoList;
	}

	@Override
	public List<BookReportDto> viewBookReportList(Long memberId) {
		Member member = memberRepository.findById(memberId).orElse(null);

		if(member == null) {
			return new ArrayList<>();
		}

		List<BookReportDto> bookReportDtoList = new ArrayList<>();
		List<BookReport> bookReports = member.getBookReports();
		for(BookReport bookReport : bookReports) {
			bookReportDtoList.add(new BookReportDto(bookReport));
		}

		return bookReportDtoList;
	}

	@Override
	public ResultResponseDto makeBookReport(BookReportDto requestDto, Long memberId) {
		ResultResponseDto responseDto = new ResultResponseDto();

		ReadBook readBook = readBookRepository.findByReadBookId(requestDto.getReadBookId()).orElse(null);
		if(readBook == null) {
			responseDto.setMessege("책이 존재하지 않습니다.");
			return responseDto;
		}

		Member member = memberRepository.findById(memberId).orElse(null);
		if(member == null) {
			responseDto.setMessege("회원이 존재하지 않습니다.");
			return responseDto;
		}

		BookReport bookReport = BookReport.builder()
			.readBook(readBook)
			.member(member)
			.bookReportTitle(requestDto.getBookReportTitle())
			.bookReportContent(requestDto.getBookReportContent())
			.build();

		bookReportRepository.save(bookReport);

		// BookReport saveBookReport = bookReportRepository.findByReadBookAndMember(readBook, member).orElse(null);
		// if(saveBookReport == null) {
		// 	responseDto.setMessege("독서록 등록 실패");
		// 	return responseDto;
		// }

		// 이미지 저장
		if(requestDto.getPhoto() != null) {
			BookReportPhoto bookReportPhoto = BookReportPhoto.builder()
				.bookReport(bookReport)
				.photo(requestDto.getPhoto())
				.build();

			bookReportPhotoRepository.save(bookReportPhoto);
		}

		responseDto.setResult(true);

		return responseDto;
	}


	@Override
	public BookReportDto viewBookReport(Long bookReportId) {
		BookReport bookReport = bookReportRepository.findById(bookReportId).orElse(null);

		if(bookReport == null) {
			BookReportDto responsetDto = new BookReportDto();
			responsetDto.setResult(false);
			return responsetDto;
		}

		BookReportDto responsetDto = new BookReportDto(bookReport);

		// 이미지 조회
		BookReportPhoto bookReportPhoto = bookReportPhotoRepository.findByBookReport(bookReport).orElse(null);
		if(bookReportPhoto != null) {
			responsetDto.setPhoto(bookReportPhoto.getPhoto());
		}

		return responsetDto;
	}

	@Override
	public ResultResponseDto modifyBookReport(BookReportDto requestDto) {
		ResultResponseDto responseDto = new ResultResponseDto();

		BookReport bookReport = bookReportRepository.findById(requestDto.getBookReportId()).orElse(null);
		if(bookReport == null) {
			responseDto.setMessege("독서 기록이 없습니다.");
		}

		ReadBook readBook = readBookRepository.findByReadBookId(requestDto.getReadBookId()).orElse(null);
		if(readBook == null) {
			responseDto.setMessege("해당 도서가 없습니다.");
		}

		// 이미지 수정 // 수정 필요
		if(requestDto.getPhoto() != null) {
			BookReportPhoto chackBookReportPhoto = bookReportPhotoRepository.findByBookReport(bookReport).orElse(null);
			BookReportPhoto bookReportPhoto;

			if(chackBookReportPhoto == null) {
				bookReportPhoto = BookReportPhoto.builder()
					.bookReport(bookReport)
					.photo(requestDto.getPhoto())
					.build();
			} else {
				bookReportPhoto = BookReportPhoto.builder()
					.bookReportPhotoId(chackBookReportPhoto.getBookReportPhotoId())
					.bookReport(bookReport)
					.photo(requestDto.getPhoto())
					.build();
			}

			bookReportPhotoRepository.save(bookReportPhoto);
		}

		BookReport newBookReport = BookReport.builder()
			.bookReportId(requestDto.getBookReportId())
			.readBook(readBook)
			.member(bookReport.getMember())
			.bookReportTitle(requestDto.getBookReportTitle())
			.bookReportContent(requestDto.getBookReportContent())
			.build();

		bookReportRepository.save(newBookReport);
		responseDto.setResult(true);

		return responseDto;
	}

	@Override
	public ResultResponseDto removeBookReport(Long bookReportId) {
		ResultResponseDto responseDto = new ResultResponseDto();

		BookReport bookReport = bookReportRepository.findById(bookReportId).orElse(null);
		if(bookReport == null) {
			responseDto.setMessege("독서 기록을 찾을 수 없습니다.");
			return responseDto;
		}

		// 이미지 삭제
		BookReportPhoto bookReportPhoto = bookReportPhotoRepository.findByBookReport(bookReport).orElse(null);
		if(bookReportPhoto != null) {
			bookReportPhotoRepository.delete(bookReportPhoto);
		}
		bookReportRepository.delete(bookReport);

		responseDto.setResult(true);

		return responseDto;
	}

	@Override
	public ResultResponseDto makeFriend(Long memberId, Long meId) {
		ResultResponseDto responseDto = new ResultResponseDto();

		Member member = memberRepository.findByMemberId(memberId);
		Member me = memberRepository.findByMemberId(meId);
		if(member == null || member == null) {
			responseDto.setResult(false);
			responseDto.setMessege("찾는 회원이 없습니다.");
			return responseDto;
		}

		Friend checkFriend = friendRepository.findByFollowerAndFollowing(me, memberId).orElse(null);
		if(checkFriend != null) {
			responseDto.setResult(false);
			responseDto.setMessege("이미 추가한 친구입니다.");
			return responseDto;
		}

		Friend friend = Friend.builder()
			.follower(me)
			.following(memberId)
			.build();
		friendRepository.save(friend);
		responseDto.setResult(true);

		return responseDto;
	}

	@Override
	public ResultResponseDto removeFriend(Long memberId, Long meId) {
		ResultResponseDto responseDto = new ResultResponseDto();

		Member member = memberRepository.findByMemberId(memberId);
		Member me = memberRepository.findByMemberId(meId);
		if(member == null || member == null) {
			responseDto.setResult(false);
			responseDto.setMessege("찾는 회원이 없습니다.");
			return responseDto;
		}

		Friend friend = friendRepository.findByFollowerAndFollowing(me, memberId).orElse(null);
		if(friend == null) {
			responseDto.setResult(false);
			responseDto.setMessege("친구가 없습니다.");
			return responseDto;
		}

		friendRepository.delete(friend);
		responseDto.setResult(true);

		return responseDto;
	}

	@Override
	public List<FriendDto> viewFollowingList(Long memberId) {
		Member member = memberRepository.findById(memberId).orElse(null);
		if(member == null) {
			return new ArrayList<>();
		}

		List<FriendDto> friendDtoList = new ArrayList<>();
		List<Friend> friends = member.getFriends();
		for(Friend friend : friends) {
			friendDtoList.add(new FriendDto(friend));
		}

		return friendDtoList;
	}

	@Override
	public List<FriendDto> viewFollowerList(Long memberId) {
		Member member = memberRepository.findById(memberId).orElse(null);
		if(member==null){
			return new ArrayList<>();
		}
		List<FriendDto> followerDtoList = new ArrayList<>();
		List<Friend> friends = friendRepository.findByFollowing(member.getMemberId());
		for(Friend friend : friends){
			followerDtoList.add(new FriendDto(friend));
		}
		return followerDtoList;
	}

	private List<OwnBookDto> getOwnBookList(Member member) {
		List<OwnBook> ownBooks = member.getOwnBooks();
		List<OwnBookDto> ownBookDtoList = new ArrayList<>();
		for(OwnBook ownBook : ownBooks) {
			ownBookDtoList.add(new OwnBookDto(ownBook));
		}
		return ownBookDtoList;
	}

	private List<ReadBookDto> getReadBookList(Member member) {
		List<ReadBook> readBooks = member.getReadBooks();

		List<ReadBookDto> readBookDtoList = new ArrayList<>();
		for(ReadBook readBook : readBooks) {
			readBookDtoList.add(new ReadBookDto(readBook));
		}

		return readBookDtoList;
	}

	private List<GroupShowDto> getMyGroups(Long memberId) {
		Member member = memberRepository.findById(memberId).orElse(null);

		if(member == null) {
			return new ArrayList<>();
		}

		List<GroupShowDto> groupShowDto = new ArrayList<>();
		List<GroupJoin> findGroupJoin = member.getGroupJoins();
		for(GroupJoin groupJoin : findGroupJoin) {
			Groups groups = groupJoin.getGroups();
			groupShowDto.add(GroupShowDto.builder()
				.groupName(groups.getGroupName())
				.groupDescrib(groups.getGroupIntroduction())
				.groupProfile(groups.getGroupProfile())
				.groupId(groups.getGroupId())
				.build());
		}

		return groupShowDto;
	}
}
