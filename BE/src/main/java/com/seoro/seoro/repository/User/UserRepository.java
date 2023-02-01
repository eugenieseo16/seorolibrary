package com.seoro.seoro.repository.User;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seoro.seoro.domain.entity.User.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
