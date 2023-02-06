package com.seoro.seoro.service.Book;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import java.util.Calendar;
import java.util.Collection;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Service;
import com.seoro.seoro.domain.dto.Book.BookDto;
// import com.seoro.seoro.domain.entity.User.User;
// import com.seoro.seoro.repository.Book.OwnBookRepository;
// import com.seoro.seoro.repository.Book.ReviewRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

	// final BookRepository bookRepository;
	// final ReviewRepository reviewRepository;
	// final OwnBookRepository ownBookRepository;

	// @Override
	// public List<ReviewDto> findReviewByIsbn(String isbn) {
	// 	List<Review> list = reviewRepository.findByBook_Isbn(isbn);
	// 	List<ReviewDto> dtoList = new ArrayList<>();
	// 	for(Review review: list){
	// 		dtoList.add(ReviewDto.builder()
	// 			.isbn(review.getBook().getIsbn())
	// 			.userName(review.getUser().getUserName())
	// 			.reviewContent(review.getReviewContent())
	// 			.build());
	// 	}
	// 	return dtoList;
	// }

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


	// @Override
	// public BookDto findByIsbn(String isbn) {
	// 	Book list = bookRepository.findByIsbn(isbn);
	// 	BookDto dtoList = BookDto.builder()
	// 		.isbn(list.getIsbn())
	// 		.bookTitle(list.getBookTitle())
	// 		.bookAuthor(list.getBookAuthor())
	// 		.bookPublisher(list.getBookPublisher())
	// 		.bookImage(list.getBookImage())
	// 		.bookDescrib(list.getBookDescrib())
	// 		.bookPubDate(list.getBookPubDate())
	// 		.review_count(list.getReviews().size())
	// 		.owncomment_count(findOwnBookByIsbn(isbn).size())
	// 		.build();
	// 	return dtoList;
	// }

	// @Override
	// public List<BookDto> findBook(String input) {
	// 	URL url ="https://data4library.kr/api/srchBooks?authKey=5131ae002fe7c43930587697cae1f2fe3b9495c7df43cc23b8ee69e3ccb017f7&keyword=%EB%96%A1%EB%B3%B6%EC%9D%B4&pageSize=100";
	// 	List<Book> list = bookRepository.findByBookTitleLikeOrBookAuthorLike(input1, input2);
	// 	List<BookDto> dtoList = new ArrayList<>();
	// 	for(Book book: list){
	// 		dtoList.add(BookDto.builder()
	// 			.isbn(book.getIsbn())
	// 			.bookTitle(book.getBookTitle())
	// 			.bookAuthor(book.getBookAuthor())
	// 			.bookPublisher(book.getBookPublisher())
	// 			.bookImage(book.getBookImage())
	// 			.bookDescrib(book.getBookDescrib())
	// 			.bookPubDate(book.getBookPubDate())
	// 			.build());
	// 	}
	// 	return dtoList;
	// }

	// @Override
	// public String findBestSeller() throws IOException {
	// 	String result = "";
	// 	try {
	// 		Calendar today = new GregorianCalendar();
	// 		today.add(Calendar.DATE,-7);
	// 		SimpleDateFormat SDF = new SimpleDateFormat("yyyy-MM-dd");
	// 		String now = SDF.format(today.getTime());
	// 		URL url = new URL("http://data4library.kr/api/loanItemSrch?authKey=5131ae002fe7c43930587697cae1f2fe3b9495c7df43cc23b8ee69e3ccb017f7&startDt="+now+"&pageSize=10&format=json");
	// 		BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
	// 		result = br.readLine();
	// 		// List<Book> list =
	// 		//
	// 		// for(Book book: list){
	// 		//     dtoList.add(BookDto.builder()
	// 		//         .isbn(book.getIsbn())
	// 		//         .bookTitle(book.getBookTitle())
	// 		//         .bookAuthor(book.getBookAuthor())
	// 		//         .bookPublisher(book.getBookPublisher())
	// 		//         .bookImage(book.getBookImage())
	// 		//         .bookDescrib(book.getBookDescrib())
	// 		//         .bookPubDate(book.getBookPubDate())
	// 		//         .bookPage(book.getBookPage())
	// 		//         .build());
	// 		// }
	// 	} catch (MalformedURLException e) {
	// 		throw new RuntimeException(e);
	// 	}
	// 	return result;
	// }
	@Override
	public List findBestSeller() throws IOException {
		List<BookDto> output = new ArrayList<>();
		try {
			Calendar today = new GregorianCalendar();
			today.add(Calendar.DATE,-7);
			SimpleDateFormat SDF = new SimpleDateFormat("yyyy-MM-dd");
			String now = SDF.format(today.getTime());
			URL url = new URL("http://data4library.kr/api/loanItemSrch?authKey=5131ae002fe7c43930587697cae1f2fe3b9495c7df43cc23b8ee69e3ccb017f7&startDt="+now+"&pageSize=10&format=json");
			BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));

			String result = br.readLine();
			JSONParser jsonParser = new JSONParser();
			try{
				JSONObject jsonObject = (JSONObject)jsonParser.parse(result);
				JSONObject responseResult = (JSONObject)jsonObject.get("response");
				ArrayList docs = new ArrayList((Collection)responseResult.get("docs"));
				for(Object list: docs){
					JSONObject jsonlist = (JSONObject)list;
					Map outputlist = (Map)jsonlist.get("doc");
					BookDto bookDto = new BookDto();
					output.add(BookDto.builder()
							.bookImage(outputlist.get("bookImageURL").toString())
							.bookTitle(outputlist.get("bookname").toString())
							.isbn(outputlist.get("isbn13").toString())
							.result(true)
						.build());
				}
			} catch (Exception e) {
			}
		} catch (MalformedURLException e) {
			throw new RuntimeException(e);
		}
		return output;
	}

	// @Override
	// public ResultResponseDto makeReview(ReviewDto requestDto) {
	// 	ResultResponseDto resultResponseDto = new ResultResponseDto();
	//
	// 	User writer = new User();
	//
	// 	Review review = Review.builder()
	// 		.user(writer)
	// 		.reviewContent(requestDto.getReviewContent())
	// 		.book(bookRepository.findByIsbn(requestDto.getIsbn()))
	// 		.build();
	// 	reviewRepository.save(review);
	// 	resultResponseDto.setResult(true);
	//
	// 	return resultResponseDto;
	// }
}
