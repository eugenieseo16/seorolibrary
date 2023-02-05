package com.seoro.seoro.repository.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seoro.seoro.domain.entity.User.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	List<User> findByUserNameLike(String userName);
	User findUserByUserName(String userName);
}
