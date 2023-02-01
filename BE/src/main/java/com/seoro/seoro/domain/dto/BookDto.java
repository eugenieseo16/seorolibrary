package com.seoro.seoro.domain.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.seoro.seoro.domain.entity.Book.Book;
import com.seoro.seoro.domain.entity.Book.Review;


@Data
@NoArgsConstructor
public class BookDto {
	private boolean result;
	private String isbn;
	private String bookTitle;
	private String bookAuthor;
	private String bookPublisher;
	private String bookImage;
	private String bookDescrib;
	private Date bookPubDate;
	private Integer bookPage;
	private List<Review> reviews = new ArrayList<>();

}
