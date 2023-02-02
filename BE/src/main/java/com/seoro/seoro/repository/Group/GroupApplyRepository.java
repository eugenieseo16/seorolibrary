package com.seoro.seoro.repository.Group;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seoro.seoro.domain.entity.Groups.GroupApply;

public interface GroupApplyRepository extends JpaRepository<GroupApply, Long> {
	Long countByuserId(Long userId);
}
