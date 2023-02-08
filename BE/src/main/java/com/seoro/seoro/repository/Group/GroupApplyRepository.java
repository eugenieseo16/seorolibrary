package com.seoro.seoro.repository.Group;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seoro.seoro.domain.entity.Groups.GroupApply;
import com.seoro.seoro.domain.entity.Groups.Groups;

public interface GroupApplyRepository extends JpaRepository<GroupApply, Long> {

	List<GroupApply> findByGroups(Groups group);
}
