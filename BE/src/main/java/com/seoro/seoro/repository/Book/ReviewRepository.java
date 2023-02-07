package com.seoro.seoro.repository.Book;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.seoro.seoro.domain.entity.Book.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
	Review findByReadBook_IsbnAndMember_MemberId(@Param(value= "isbn") String isbn, @Param(value="MemberId")String loginId);

}