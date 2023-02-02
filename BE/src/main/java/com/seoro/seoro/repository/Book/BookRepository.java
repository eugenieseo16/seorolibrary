package com.seoro.seoro.repository.Book;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seoro.seoro.domain.entity.Book.Book;

public interface BookRepository extends JpaRepository<Book, String> {
}
