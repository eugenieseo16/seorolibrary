package com.seoro.seoro.service.GroupPost;

import com.seoro.seoro.domain.dto.GroupPost.GroupPostCreateRequestDto;
import com.seoro.seoro.domain.dto.GroupPost.GroupPostReadResponseDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface GroupPostService {
    ResultResponseDto createGroupPost(GroupPostCreateRequestDto requestDto);
    GroupPostReadResponseDto readGroupPost(Long groupId);
}
