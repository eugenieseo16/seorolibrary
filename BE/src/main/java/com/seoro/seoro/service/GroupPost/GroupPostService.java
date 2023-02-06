package com.seoro.seoro.service.GroupPost;

import com.seoro.seoro.domain.dto.GroupPost.GroupPostCreateRequestDto;
import com.seoro.seoro.domain.dto.GroupPost.GroupPostDetailResponseDto;
import com.seoro.seoro.domain.dto.GroupPost.GroupPostReadRequestDto;
import com.seoro.seoro.domain.dto.GroupPost.GroupPostReadResponseDto;
import com.seoro.seoro.domain.dto.GroupPost.GroupPostUpdateRequestDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface GroupPostService {
    ResultResponseDto createGroupPost(GroupPostCreateRequestDto requestDto);
    GroupPostReadResponseDto readGroupPost(GroupPostReadRequestDto requestDto);
    GroupPostDetailResponseDto readGroupPostDetail(Long postId);
    GroupPostDetailResponseDto updateGroupPost(Long postId, GroupPostUpdateRequestDto requestDto);
    ResultResponseDto deleteGroupPost(Long postId);
}
