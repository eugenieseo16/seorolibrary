package com.seoro.seoro.repository.Group;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seoro.seoro.domain.entity.Groups.GroupBook;
import com.seoro.seoro.domain.entity.Groups.Groups;

public interface GroupBookRepository extends JpaRepository<GroupBook, Long> {
	Optional<GroupBook> findByGroups(Groups groups);
}
