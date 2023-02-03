package com.seoro.seoro.repository.GroupPost;

import com.seoro.seoro.domain.entity.Groups.GroupPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupPostRepository extends JpaRepository<GroupPost, Long> {

	@Override
	void deleteById(Long postId);
}
