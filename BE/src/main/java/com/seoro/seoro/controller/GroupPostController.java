package com.seoro.seoro.controller;

import com.seoro.seoro.domain.dto.GroupPost.GroupPostCreateRequestDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
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
    public ResultResponseDto createGroupPost(@ModelAttribute GroupPostCreateRequestDto requestDto) {
        return groupPostService.createGroupPost(requestDto);
    }
}
