package com.seoro.seoro.service.Book;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import java.util.Calendar;
import java.util.Collection;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.NoSuchElementException;

import com.seoro.seoro.domain.dto.Book.*;
import com.seoro.seoro.domain.dto.Member.MemberDto;
import com.seoro.seoro.domain.dto.Member.MemberShowDto;
import com.seoro.seoro.domain.entity.Book.ReadBook;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.HtmlUtils;

import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.domain.entity.Book.OwnBook;
import com.seoro.seoro.domain.entity.Book.Review;
import com.seoro.seoro.domain.entity.Member.Member;
import com.seoro.seoro.repository.Book.OwnBookRepository;
import com.seoro.seoro.repository.Book.ReadBookRepository;
import com.seoro.seoro.repository.Book.ReviewRepository;
import com.seoro.seoro.repository.Member.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
	final ReviewRepository reviewRepository;
	final ReadBookRepository readBookRepository;
	final MemberRepository memberRepository;
	final OwnBookRepository ownBookRepository;

	@Override
	public ResultResponseDto makeReview(String isbn, ReviewDto requestDto) {
		//리뷰 작성하면 readBook에 추가하도록
		ResultResponseDto resultResponseDto = new ResultResponseDto();
		//사용자 정보 가져오기
		Member member = new Member();
		Optional<Member> findMember = memberRepository.findByMemberName(requestDto.getMemberName());
		if(findMember.isPresent()) {
			member = findMember.get();
		} else {
			resultResponseDto.setResult(false);
			return resultResponseDto;
		}

		ReadBook readBook = new ReadBook();
		Optional<ReadBook> findReadBook = readBookRepository.findByIsbnAndMember(isbn, member);
		if(findReadBook.isPresent()) { //읽은 도서에 추가
			readBook = findReadBook.get();
		} else {
			readBook = ReadBook.builder()
				.bookImage(requestDto.getBookImage())
				.bookTitle(requestDto.getBookTitle())
				.isbn(isbn)
				.member(member)
				.build();
			readBookRepository.save(readBook);
		}

		System.out.println("readBook.getIsbn() = " + readBook.getIsbn());
		Review review = Review.builder()
			.reviewContent(requestDto.getReviewContent())
			.member(member)
			.readBook(readBook)
			.build();
		reviewRepository.save(review);

		resultResponseDto.setResult(true);
		return resultResponseDto;
	}

	@Override
	public List findBookByDong(Long memberId) {
		Member findMember = memberRepository.findByMemberId(memberId);
		List<ShowBookDto> books = new ArrayList<>();
		if(findMember==null){
			return null;
		}
		String myDongCode = findMember.getMemberDongCode();

		List<Member> members = memberRepository.findByMemberDongCode(myDongCode);
		for(Member member : members){
			if(member.getMemberId().equals(memberId)) continue;
			List<OwnBook> ownBooks = member.getOwnBooks();
			for(OwnBook ownBook : ownBooks){
				books.add(ShowBookDto.builder()
					.bookTitle(ownBook.getBookTitle())
					.bookImage(ownBook.getBookImage())
					.isbn(ownBook.getIsbn())
					.bookAuthor(ownBook.getAuthor())
					.memberName(member.getMemberName())
					.bookDescrib(ownBook.getBookdescrib())
					.isOwn(ownBook.getIsOwn())
					.build());
			}
		}

		return books;
	}

	@Override
	public ResultResponseDto changeReview(String isbn, ReviewUpdateDto requestDto) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();

		//사용자 정보 가져오기
		Member member = new Member();
		Optional<Member> findMember = memberRepository.findByMemberName(requestDto.getMemberName());
		if(findMember.isPresent()) {
			member = findMember.get();
		} else {
			resultResponseDto.setResult(false);
			return resultResponseDto;
		}

		ReadBook readBook = new ReadBook();
		Optional<ReadBook> findReadBook = readBookRepository.findByIsbnAndMember(isbn, member);
		if(findReadBook.isPresent()) { //읽은 도서에 추가
			readBook = findReadBook.get();
		} else {
			resultResponseDto.setResult(false);
			return resultResponseDto;
		}

		Review review = Review.builder()
			.reviewId(requestDto.getReviewId())
			.reviewContent(requestDto.getReviewContent())
			.member(member)
			.readBook(readBook)
			.build();
		reviewRepository.save(review);
		resultResponseDto.setResult(true);
		return resultResponseDto;
	}

	@Override
	public ResultResponseDto deleteReview(String isbn, Long reviewId) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();

		// Member writer = new Member();
		// Optional<Member> tmpUser = memberRepository.findByMemberName(requestDto.getMemberName());
		// if (tmpUser.isPresent()) {
		// 	writer = tmpUser.get();
		// } else {
		// 	writer = tmpUser.orElse(null);
		// 	resultResponseDto.setResult(false);
		// 	return resultResponseDto;
		// }

		Optional<Review> findReview = reviewRepository.findById(reviewId);
		Review review = null;
		if(findReview.isPresent()) {
			review = findReview.get();
		} else {
			resultResponseDto.setResult(false);
			return resultResponseDto;
		}

		reviewRepository.deleteById(reviewId);

		resultResponseDto.setResult(true);
		return resultResponseDto;
	}

	@Override
	public BookReviewResponseDto viewBookReview(String isbn) {
		BookReviewResponseDto responseDto = new BookReviewResponseDto();
		List<ReadBook> findBooks = readBookRepository.findByIsbn(isbn);

		List<BookReviewDto> reviews = new ArrayList<>();
		for(ReadBook rb : findBooks) {
			List<Review> getReviews = rb.getReviews();
			for(Review r : getReviews) {
				BookReviewDto dto = BookReviewDto.builder()
						.memberId(r.getMember().getMemberId())
						.memberName(r.getMember().getMemberName())
						.memberProfile(r.getMember().getMemberProfile())
						.reviewId(r.getReviewId())
						.reviewContent(r.getReviewContent())
						.build();
				reviews.add(dto);
			}
		}

		responseDto.setResult(true);
		responseDto.setReviews(reviews);
		return responseDto;
	}

	@Override
	public BookCommentResponseDto viewBookComment(String isbn) {
		BookCommentResponseDto responseDto = new BookCommentResponseDto();
		List<OwnBook> findBook = ownBookRepository.findByIsbn(isbn);
		List<BookCommentDto> comments = new ArrayList<>();
		for(OwnBook ob : findBook) {
			BookCommentDto dto = BookCommentDto.builder()
					.memberId(ob.getMember().getMemberId())
					.memberName(ob.getMember().getMemberName())
					.memberProfile(ob.getMember().getMemberProfile())
					.comment(ob.getOwnComment())
					.build();
			comments.add(dto);
		}

		responseDto.setResult(true);
		responseDto.setComments(comments);
		return responseDto;
	}

	@Override
	public ResultResponseDto addReadBook(String isbn, Map<String,String> request) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();

		Member member = new Member();
		Optional<Member> findMember = memberRepository.findByMemberName(request.get("memberName"));
		if(findMember.isPresent()) {
			member = findMember.get();
		} else {
			resultResponseDto.setResult(false);
			return resultResponseDto;
		}

		ReadBook readBook = new ReadBook();
		Optional<ReadBook> findReadBook = readBookRepository.findByIsbnAndMember(isbn,member);
		if(findReadBook.isPresent()){
			resultResponseDto.setResult(false);
			return resultResponseDto;
		}
		readBook = ReadBook.builder()
			.bookImage(request.get("bookImage"))
			.bookTitle(request.get("bookTitle"))
			.isbn(isbn)
			.member(member)
			.build();
		readBookRepository.save(readBook);

		System.out.println("readBook.getIsbn() = " + readBook.getIsbn());
		resultResponseDto.setResult(true);
		return resultResponseDto;
	}

	@Override
	public List<MemberShowDto> showReader(String isbn) {
		List<MemberShowDto> memberShowDto = new ArrayList<>();
		List<ReadBook> books = readBookRepository.findByIsbn(isbn);
		for(ReadBook readBook : books){
			memberShowDto.add(MemberShowDto.builder()
				.memberName(readBook.getMember().getMemberName())
				.memberProfile(readBook.getMember().getMemberProfile())
				.build()) ;
		}

		return memberShowDto;
	}

	@Override
	public ReviewDto findReviewByIsbnAndMemberId(String isbn) {
		Long member_id=1L;
		Review review= reviewRepository.findByReadBook_IsbnAndMember_MemberId(isbn,member_id);
		ReviewDto dtoOutput = ReviewDto.builder()
			.memberName(review.getMember().getMemberName())
			.isbn(review.getReadBook().getIsbn())
			.reviewContent(review.getReviewContent())
			.build();

		return dtoOutput;
	}

	// public List<OwnBookDto> findOwnBookByIsbn(String isbn) {
	// 	List<OwnBook> list = ownBookRepository.findByBook_Isbn(isbn);
	// 	List<OwnBookDto> dtoList = new ArrayList<>();
	// 	for(OwnBook ownBook: list){
	// 		dtoList.add(OwnBookDto.builder()
	// 			.isbn(ownBook.getBook().getIsbn())
	// 			.userId(ownBook.getUser().getUserId())
	// 			.ownComment(ownBook.getOwnComment())
	// 			.build());
	// 	}
	// 	return dtoList;


	// 일반 상세
	@Override
	public BookDetailDto viewBookDetail(String isbn, Long memberId) throws ParseException, URISyntaxException {
		RestTemplate rest = new RestTemplate();
		HttpHeaders headers= new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		String appkey = "KakaoAK aa8ebbcbc5acc532a0a4d5b0712afc48";
		headers.set("Authorization", appkey);
		HttpEntity<String> entity = new HttpEntity<String>("parameters",headers);
		long count_review = reviewRepository.countByReadBook_Isbn(isbn);
		long count_readpeople = readBookRepository.countByIsbn(isbn);
		List<MemberDto> own_members = new ArrayList<>();
		List<OwnBook> ownBooks = ownBookRepository.findByIsbn(isbn);
		long count_comment = 0;
		for(OwnBook book : ownBooks){
			Member member = book.getMember();
			if(book.getOwnComment().length()>0) count_comment++;
			if(!member.getMemberDongCode().equals(memberRepository.findByMemberId(memberId).getMemberDongCode())) continue;
			own_members.add(MemberDto.builder()
					.memberId(member.getMemberId())
					.memberProfile(member.getMemberProfile())
					.memberName(member.getMemberName())
					.build());
		}

		BookDetailDto output;
		URI uri =new URI("https://dapi.kakao.com/v3/search/book?size=50&target=isbn&query="+isbn);
		ResponseEntity<String> res = rest.exchange(uri, HttpMethod.GET, entity, String.class);
		JSONParser jsonParser = new JSONParser();
		JSONObject body = (JSONObject) jsonParser.parse(res.getBody().toString());
		JSONArray docu = (JSONArray) body.get("documents");
		JSONObject bookObject = (JSONObject)docu.get(0);

		JSONArray authors = (JSONArray)bookObject.get("authors");

		output=BookDetailDto.builder()
			.bookTitle(HtmlUtils.htmlUnescape(bookObject.get("title").toString()))
			.bookImage(bookObject.get("thumbnail").toString())
			.isbn(isbn)
			.bookAuthor(HtmlUtils.htmlUnescape(authors.get(0).toString()))
			.bookDescrib(HtmlUtils.htmlUnescape(bookObject.get("contents").toString()))
			.bookPublisher(bookObject.get("publisher").toString())
			.countComment(count_comment)
			.bookPubDate(bookObject.get("datetime").toString().substring(0,10))
			.countReader(count_readpeople)
			.countReview(count_review)
			.ownMembers(own_members)
			.result(true)
			.build();

		return output;
	}

	@Override
	public OwnBookDetailDto viewOwnBookDetail(String memberName, String isbn) throws ParseException, URISyntaxException {
		OwnBookDetailDto responseDto;

		Member member = memberRepository.findByMemberName(memberName).orElse(null);
		if(member == null) {
			responseDto = new OwnBookDetailDto();
			responseDto.setResult(false);
			responseDto.setMessege("찾는 회원이 없습니다.");
		}

		BookDetailDto bookDetailDto = viewBookDetail(isbn, member.getMemberId());
		if(bookDetailDto == null) {
			responseDto = new OwnBookDetailDto();
			responseDto.setResult(false);
			responseDto.setMessege("찾는 책 정보가 없습니다.");
		}

		responseDto = new OwnBookDetailDto(bookDetailDto);

		OwnBook ownBook = ownBookRepository.findByMemberAndIsbn(member, isbn).orElse(null);
		if(ownBook == null) {
			responseDto = new OwnBookDetailDto();
			responseDto.setResult(false);
			responseDto.setMessege("보유하지 않은 책입니다.");
		}

		responseDto.setOwn(ownBook.getIsOwn());
		responseDto.setOwnComment(ownBook.getOwnComment());

		// 보유 도서
		List<OwnBook> ownBooks = member.getOwnBooks();
		List<OwnBookDto> ownBookDtoList = new ArrayList<>();
		for(OwnBook ownBookList : ownBooks) {
			ownBookDtoList.add(new OwnBookDto(ownBookList));
		}
		responseDto.setOwnBookList(ownBookDtoList);

		return responseDto;
	}

	@Override
	public List<ShowBookDto> findBook(String input) throws IOException, ParseException, URISyntaxException {
		RestTemplate rest = new RestTemplate();
		HttpHeaders headers= new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		String appkey = "KakaoAK aa8ebbcbc5acc532a0a4d5b0712afc48";
		headers.set("Authorization", appkey);
		HttpEntity<String> entity = new HttpEntity<String>("parameters",headers);

		List<ShowBookDto> output = new ArrayList<>();

		URI uri =new URI("https://dapi.kakao.com/v3/search/book?size=50&query="+URLEncoder.encode(input,"utf-8"));
		ResponseEntity<String> res = rest.exchange(uri, HttpMethod.GET, entity, String.class);
		JSONParser jsonParser = new JSONParser();
		JSONObject body = (JSONObject) jsonParser.parse(res.getBody().toString());
		JSONArray docu = (JSONArray) body.get("documents");
		System.out.println(docu.size());
		for(Object json: docu){
			JSONObject bookObject = (JSONObject) json;
			System.out.println(bookObject);
			JSONArray authors = (JSONArray)bookObject.get("authors");
			String isbns = bookObject.get("isbn").toString();
			String isbn = isbns.substring(isbns.length()-13,isbns.length()-1);
			output.add(ShowBookDto.builder()
				.bookTitle(HtmlUtils.htmlUnescape(bookObject.get("title").toString()))
				.bookImage(bookObject.get("thumbnail").toString())
				.isbn(isbn)
				.bookAuthor(HtmlUtils.htmlUnescape(authors.size() !=0? authors.get(0).toString():""))
				.bookDescrib(HtmlUtils.htmlUnescape(bookObject.get("contents").toString()))
				.build());
		}
		return output;
	}

	@Override
	public List findBestSeller() throws IOException {
		List<ShowBookDto> output = new ArrayList<>();
		try {
			Calendar today = new GregorianCalendar();
			today.add(Calendar.DATE,-7);
			SimpleDateFormat SDF = new SimpleDateFormat("yyyy-MM-dd");
			String now = SDF.format(today.getTime());
			URL url = new URL("http://data4library.kr/api/loanItemSrch?authKey=5131ae002fe7c43930587697cae1f2fe3b9495c7df43cc23b8ee69e3ccb017f7&startDt="+now+"&pageSize=10&format=json");
			BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));

			String result = br.readLine();
			JSONParser jsonParser = new JSONParser();

			JSONObject jsonObject = (JSONObject)jsonParser.parse(result);
			JSONObject responseResult = (JSONObject)jsonObject.get("response");
			ArrayList docs = new ArrayList((Collection)responseResult.get("docs"));
			for(Object list: docs){
				JSONObject jsonlist = (JSONObject)list;
				Map outputlist = (Map)jsonlist.get("doc");
				ShowBookDto showBookDto = new ShowBookDto();
				output.add(ShowBookDto.builder()
						.bookImage(outputlist.get("bookImageURL").toString())
						.bookTitle(outputlist.get("bookname").toString())
						.isbn(outputlist.get("isbn13").toString())
					.build());
			}
		}catch (Exception e) {

		}
		return output;
	}
}
