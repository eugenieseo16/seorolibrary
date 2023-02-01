package com.seoro.seoro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seoro.seoro.domain.entity.Book.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, String> {
}
