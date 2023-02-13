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

import com.seoro.seoro.domain.dto.Book.BookDetailDto;
import com.seoro.seoro.domain.dto.Book.OwnBookDetailDto;
import com.seoro.seoro.domain.dto.Book.OwnBookDto;
import com.seoro.seoro.domain.dto.Book.OwnCommentDetailDto;
import com.seoro.seoro.domain.dto.Book.ShowBookDto;
import com.seoro.seoro.domain.dto.Book.ReviewDto;
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
		ResultResponseDto resultResponseDto = new ResultResponseDto();

		Member writer = new Member();
		Optional<Member> tmpUser = memberRepository.findByMemberName(requestDto.getMemberName());
		if(tmpUser.isPresent()){
			writer = tmpUser.get();
		}else{
			writer = tmpUser.orElse(null);
			resultResponseDto.setResult(false);
			return resultResponseDto;
		}
		Review review = Review.builder()
			.member(writer)
			.reviewContent(requestDto.getReviewContent())
			.readBook(readBookRepository.findByIsbn(requestDto.getIsbn()).get())
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
					.memberId(member.getMemberId())
					.bookDescrib(ownBook.getOwnComment())
					.isOwn(ownBook.getIsOwn())
					.build());
			}
		}

		return books;
	}

	@Override
	public ResultResponseDto changeReview(String isbn, ReviewDto requestDto) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();

		Member writer = new Member();
		Optional<Member> tmpUser = memberRepository.findByMemberName(requestDto.getMemberName());
		if(tmpUser.isPresent()){
			writer = tmpUser.get();
		}else{
			writer = tmpUser.orElse(null);
			resultResponseDto.setResult(false);
			return resultResponseDto;
		}

		Review saveReview = reviewRepository.findByReadBook_IsbnAndMember_MemberId(isbn, writer.getMemberId());

		saveReview = Review.builder()
			.member(writer)
			.reviewId(saveReview.getReviewId())
			.reviewContent(requestDto.getReviewContent())
			.readBook(readBookRepository.findByIsbn(isbn).get())
			.build();
		reviewRepository.save(saveReview);
		resultResponseDto.setResult(true);

		return resultResponseDto;
	}

	@Override
	public ResultResponseDto deleteReview(String isbn, ReviewDto requestDto) {
		ResultResponseDto resultResponseDto = new ResultResponseDto();

		Member writer = new Member();
		Optional<Member> tmpUser = memberRepository.findByMemberName(requestDto.getMemberName());
		if (tmpUser.isPresent()) {
			writer = tmpUser.get();
		} else {
			writer = tmpUser.orElse(null);
			resultResponseDto.setResult(false);
			return resultResponseDto;
		}

		Review saveReview = reviewRepository.findByReadBook_IsbnAndMember_MemberId(isbn, writer.getMemberId());
		reviewRepository.deleteById(saveReview.getReviewId());

		resultResponseDto.setResult(true);

		return resultResponseDto;
	}
	public List<OwnCommentDetailDto> viewOwnCommentList(String isbn) {
		List<OwnCommentDetailDto> commentDtoList = new ArrayList<>();
		// List<OwnBook> ownBooks = ownBookRepository.findByIsbn(isbn);
		// if(ownBooks == null || ownBooks.isEmpty()) {
		// 	throw new NoSuchElementException("결과 없음");
		// }
		// for (OwnBook ownBook : ownBooks) {
		// 	commentDtoList.add(new OwnCommentDetailDto(ownBook));
		// }

		return commentDtoList;
	}

	@Override
	public OwnCommentDetailDto modifyownComment(String isbn, OwnCommentDetailDto requestDto) {
		OwnBook ownBook = ownBookRepository.findByMemberAndIsbn(requestDto.getMember(), isbn).orElseThrow(() -> new NoSuchElementException("보유도서가 없습니다."));

		ownBook = OwnBook.builder()
			.ownBookId(ownBook.getOwnBookId())
			.member(ownBook.getMember())
			.isbn(ownBook.getIsbn())
			.bookTitle(ownBook.getBookTitle())
			.bookImage(ownBook.getBookImage())
			.ownComment(requestDto.getOwnComment())
			.isOwn(ownBook.getIsOwn())
			.build();
		ownBookRepository.save(ownBook);

		return requestDto;
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

	// }
	// @Override
	// public List<BookDto> findAllBooks() {
	// 	List<Book> list = bookRepository.findAll();
	// 	List<BookDto> dtoList = new ArrayList<>();
	// 	for(Book book: list){
	// 		dtoList.add(BookDto.builder()
	// 				.isbn(book.getIsbn())
	// 				.bookTitle(book.getBookTitle())
	// 				.bookAuthor(book.getBookAuthor())
	// 				.bookPublisher(book.getBookPublisher())
	// 				.bookImage(book.getBookImage())
	// 				.bookDescrib(book.getBookDescrib())
	// 				.bookPubDate(book.getBookPubDate())
	// 				.build());
	// 	}
	// 	return dtoList;

	// }

	// 일반 상세
	@Override
	public BookDetailDto viewBookDetail(String isbn) throws IOException, ParseException {
		BookDetailDto output;
		URL url =new URL("http://data4library.kr/api/srchDtlList?authKey=5131ae002fe7c43930587697cae1f2fe3b9495c7df43cc23b8ee69e3ccb017f7&isbn13="+isbn+"&format=json");
		BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream(), "utf-8"));
		String result = br.readLine();
		System.out.println(result);
		JSONParser jsonParser = new JSONParser();
		JSONObject jsonObject = (JSONObject)jsonParser.parse(result);
		JSONObject responseResult = (JSONObject)jsonObject.get("response");
		ArrayList info = new ArrayList((Collection)responseResult.get("detail"));
		JSONObject jsonlist = (JSONObject)info.get(0);
		Map outputlist = (Map)jsonlist.get("book");

		long count_review = reviewRepository.countByReadBook_Isbn(isbn);
		long count_readpeople = readBookRepository.countByIsbn(isbn);

		output = BookDetailDto.builder()
			.bookImage(outputlist.get("bookImageURL").toString())
			.bookTitle(outputlist.get("bookname").toString())
			.isbn(outputlist.get("isbn13").toString())
			.bookPublisher(outputlist.get("publisher").toString())
			.bookPubDate(outputlist.get("publication_date").toString())
			.bookAuthor(outputlist.get("authors").toString())
			.bookDescrib(outputlist.get("description").toString())
			.result(true)
			.countReview(count_review)
			.countReader(count_readpeople)
			.build();
		return output;
	}

	//내 주변 보유사용자, 리뷰 출력 추가 필요

	@Override
	public OwnBookDetailDto viewOwnBookDetail(String isbn, Long memberId, List<OwnBookDto> myOwnBooks) throws IOException, ParseException {
		OwnBookDetailDto responseDto = new OwnBookDetailDto();

		Member member = memberRepository.findByMemberId(memberId);
		if(member == null) {
			responseDto.setResult(false);
			return responseDto;
		}

		OwnBook ownBook = ownBookRepository.findByMemberAndIsbn(member, isbn).orElseThrow(() -> new NoSuchElementException("책이 없습니다."));
		responseDto.setOwnComment(ownBook.getOwnComment());
		responseDto.setOwn(ownBook.getIsOwn());

		BookDetailDto bookDetailDto = viewBookDetail(isbn);
		responseDto.setBookDetailDto(bookDetailDto);
		responseDto.setOwnBooks(myOwnBooks);

		responseDto.setResult(true);
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
		//"https://dapi.kakao.com/v3/search/book?size=50&query="+URLEncoder.encode(input,"utf-8")
		URI uri =new URI("https://dapi.kakao.com/v3/search/book?size=50&query="+URLEncoder.encode(input,"utf-8"));
		ResponseEntity<String> res = rest.exchange(uri, HttpMethod.GET, entity, String.class);
		JSONParser jsonParser = new JSONParser();
		JSONObject body = (JSONObject) jsonParser.parse(res.getBody().toString());
		JSONArray docu = (JSONArray) body.get("documents");

		for(Object json: docu){
			JSONObject bookObject = (JSONObject) json;

			output.add(ShowBookDto.builder()
				.bookTitle(bookObject.get("title").toString())
				.bookImage(bookObject.get("thumbnail").toString())
				.isbn(bookObject.get("isbn").toString())
				.bookAuthor(bookObject.get("authors").toString())
				.bookDescrib(bookObject.get("contents").toString())
				.result(true)
				.build());
		}
		// ArrayList docs = new ArrayList((Collection)responseResult.get("volumeInfo"));
		// for(Object list: docs){
		// 	JSONObject jsonlist = (JSONObject)list;
		// 	Map outputlist = (Map)jsonlist.get("doc");
		// 	System.out.println(jsonlist);
		// 	System.out.println("!!");
		// 	ShowBookDto showBookDto = new ShowBookDto();
		// 	output.add(ShowBookDto.builder()
		// 		.bookImage(outputlist.get("bookImageURL").toString())
		// 		.bookTitle(outputlist.get("bookname").toString())
		// 		.isbn(outputlist.get("isbn13").toString())
		// 		.result(true)
		// 		.build());
		// }
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
						.result(true)
					.build());
			}
		}catch (Exception e) {

		}
		return output;
	}
}
