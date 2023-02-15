package com.seoro.seoro.controller;

import com.seoro.seoro.domain.dto.GroupPost.GroupPostCreateRequestDto;
import com.seoro.seoro.domain.dto.GroupPost.GroupPostDetailResponseDto;
import com.seoro.seoro.domain.dto.GroupPost.GroupPostReadRequestDto;
import com.seoro.seoro.domain.dto.GroupPost.GroupPostReadResponseDto;
import com.seoro.seoro.domain.dto.GroupPost.GroupPostUpdateRequestDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.domain.entity.Groups.PostCategory;
import com.seoro.seoro.service.GroupPost.GroupPostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/groups/post")
public class GroupPostController {

    private final GroupPostService groupPostService;

    @PostMapping
    public ResultResponseDto createGroupPost(@RequestBody GroupPostCreateRequestDto requestDto) {
        System.out.println("여기로 들어오는건 맞니");
        System.out.println(requestDto.toString());

        return groupPostService.createGroupPost(requestDto);
    }

    @GetMapping
    public GroupPostReadResponseDto readGroupPost(@RequestParam("groupId") Long groupId,
        @RequestParam("postCategory") PostCategory postCategory, @RequestParam("startIdx") int startIdx,
        @RequestParam("limit") int limit) {
        return groupPostService.readGroupPost(groupId, postCategory, startIdx, limit);
    }

    @GetMapping("/{postid}")
    public GroupPostDetailResponseDto readGroupPostDetail(@PathVariable("postid") Long postId) {
        return groupPostService.readGroupPostDetail(postId);
    }

    @PutMapping("/{postid}")
    public GroupPostDetailResponseDto updateGroupPost(@PathVariable("postid") Long postId, @RequestBody GroupPostUpdateRequestDto requestDto) {
        return groupPostService.updateGroupPost(postId, requestDto);
    }

    @DeleteMapping("/{postid}")
    public ResultResponseDto deleteGroupPost(@PathVariable("postid") Long postId) {
        return groupPostService.deleteGroupPost(postId);
    }
}
