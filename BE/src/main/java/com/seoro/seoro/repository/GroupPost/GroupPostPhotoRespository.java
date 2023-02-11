package com.seoro.seoro.repository.GroupPost;

import com.seoro.seoro.domain.entity.Groups.GroupPost;
import com.seoro.seoro.domain.entity.Groups.GroupPostPhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupPostPhotoRespository extends JpaRepository<GroupPostPhoto, Long> {

}
