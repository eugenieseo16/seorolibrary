package com.seoro.seoro.repository.GroupPost;

import java.util.List;

import com.seoro.seoro.domain.entity.Groups.GroupPost;
import com.seoro.seoro.domain.entity.Groups.Groups;
import com.seoro.seoro.domain.entity.Groups.PostCategory;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupPostRepository extends JpaRepository<GroupPost, Long> {

	@Override
	void deleteById(Long postId);
	List<GroupPost> findGroupPostsByGroupsAndPostCategoryOrderByGroupPostTimeDesc(Groups groups, PostCategory postCategory);
	List<GroupPost> findAllByGroupsOrderByGroupPostTimeDesc(Groups groups);
}
