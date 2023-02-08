package com.seoro.seoro.repository.Group;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seoro.seoro.domain.entity.Groups.Groups;

@Repository
public interface GroupRepository extends JpaRepository<Groups, Long>{

	List<Groups> findGroupsByGroupDongCode(String dongCode);
	void deleteById(Long groupId);
}
