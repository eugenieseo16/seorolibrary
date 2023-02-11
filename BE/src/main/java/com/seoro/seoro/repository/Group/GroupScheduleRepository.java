package com.seoro.seoro.repository.Group;

import com.seoro.seoro.domain.entity.Groups.GroupSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupScheduleRepository extends JpaRepository<GroupSchedule, Long> {
}
