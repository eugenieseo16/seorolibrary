package com.seoro.seoro.repository.Group;

import com.seoro.seoro.domain.entity.Groups.GroupJoin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupJoinRepository extends JpaRepository<GroupJoin, Long> {
}
