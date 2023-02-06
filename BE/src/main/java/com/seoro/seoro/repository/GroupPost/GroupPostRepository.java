package com.seoro.seoro.repository.GroupPost;

import java.util.List;

import com.seoro.seoro.domain.entity.Groups.GroupPost;
import com.seoro.seoro.domain.entity.Groups.Groups;
import com.seoro.seoro.domain.entity.Groups.PostCategory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupPostRepository extends JpaRepository<GroupPost, Long> {

	@Override
	void deleteById(Long postId);

	// @Query(value = "select post " +
	// 		"from GroupPost post " +
	// 		"where post.groups.groupId = :groupId " +
	// 	"and post.postCategory = :#{#postCategory.name()} " +
	// 	"order by post.groupPostTime desc")

	List<GroupPost> findGroupPostsByGroupsAndPostCategoryOrderByGroupPostTimeDesc(Groups groups, PostCategory postCategory);
}
