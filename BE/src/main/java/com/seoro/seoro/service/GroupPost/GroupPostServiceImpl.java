package com.seoro.seoro.service.GroupPost;

import com.seoro.seoro.domain.dto.GroupPost.GroupPostCreateRequestDto;
import com.seoro.seoro.domain.dto.GroupPost.GroupPostDetailResponseDto;
import com.seoro.seoro.domain.dto.GroupPost.GroupPostDto;
import com.seoro.seoro.domain.dto.GroupPost.GroupPostReadRequestDto;
import com.seoro.seoro.domain.dto.GroupPost.GroupPostReadResponseDto;
import com.seoro.seoro.domain.dto.GroupPost.GroupPostUpdateRequestDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.domain.entity.Groups.*;
import com.seoro.seoro.domain.entity.Member.Member;
import com.seoro.seoro.repository.Group.GroupRepository;
import com.seoro.seoro.repository.GroupPost.GroupPostRepository;
import com.seoro.seoro.repository.Member.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GroupPostServiceImpl implements GroupPostService {
    private final UserRepository userRepository;
    private final GroupPostRepository groupPostRepository;
    private final GroupRepository groupRepository;

    @Override
    public ResultResponseDto createGroupPost(GroupPostCreateRequestDto requestDto) {
        ResultResponseDto resultResponseDto = new ResultResponseDto();

        //작성자 확인
        Optional<Member> findUser = userRepository.findById(requestDto.getWriter());
        Member writer = new Member();
        if(findUser.isPresent()) {
            writer = findUser.get();
        } else {
            resultResponseDto.setResult(false);
            return resultResponseDto;
        }
        //그룹 확인
        Optional<Groups> findGroup = groupRepository.findById(requestDto.getGroupId());
        Groups group = new Groups();
        if(findGroup.isPresent()) {
            group = findGroup.get();
        } else {
            resultResponseDto.setResult(false);
            return resultResponseDto;
        }
//        //사진이 있을 때
//        List<GroupPostPhoto> photos = new ArrayList<>();
//        for(String p : requestDto.getPostImage()) {
//            GroupPostPhoto photo = GroupPostPhoto.builder()
//                    .groupPostPhoto(p)
//                    .groupPost()
//                    .build();
//            photos.add()
//        }


        GroupPost saveGroupPost = GroupPost.builder()
                .groupPostTitle(requestDto.getPostTitle())
                .groupPostContent(requestDto.getPostContent())
                .groups(group)
                .groupPostTime(requestDto.getPostTime())
                .postCategory(PostCategory.valueOf(requestDto.getPostCategory()))
                .member(writer)
//                .photos()
                .build();
        groupPostRepository.save(saveGroupPost);
        resultResponseDto.setResult(true);
        return resultResponseDto;
    }

    @Override
    public GroupPostReadResponseDto readGroupPost(GroupPostReadRequestDto requestDto) {
        GroupPostReadResponseDto responseDto = new GroupPostReadResponseDto();
        //그룹 정보 가져오기
        Groups group = new Groups();
        Optional<Groups> findGroup = groupRepository.findById(requestDto.getGroupId());
        if(findGroup.isPresent()) {
            group = findGroup.get();
        } else {
            responseDto.setResult(false);
            return responseDto;
        }
        
        //그룹의 게시글 가져오기 - 최근 작성한 게시글부터 정렬 && pagenation
        List<GroupPost> posts = group.getPosts();
        posts.stream().sorted(Comparator.comparing(GroupPost::getGroupPostTime).reversed());
        List<GroupPostDto> groupPost = new ArrayList<>();
        for(int i=requestDto.getStartIdx(); i< requestDto.getStartIdx() + requestDto.getLimit(); i++) {
            GroupPost p = posts.get(i);
            GroupPostDto gpd = GroupPostDto.builder()
                .postId(p.getGroupPostId())
                .postTitle(p.getGroupPostTitle())
                .postTime(p.getGroupPostTime())
                .postCategory(p.getPostCategory().toString())
                .userName(p.getMember().getMemberName())
                .build();
            groupPost.add(gpd);
        }
        responseDto.setResult(true);
        responseDto.setGroupPost(groupPost);
        return responseDto;
    }

    @Override
    public GroupPostDetailResponseDto readGroupPostDetail(Long postId) {
        GroupPostDetailResponseDto responseDto = new GroupPostDetailResponseDto();
        //게시물 정보 가져오기
        GroupPost post = new GroupPost();
        Optional<GroupPost> findPost = groupPostRepository.findById(postId);
        if(findPost.isPresent()) {
            post = findPost.get();
        } else {
            responseDto.setResult(false);
            return responseDto;
        }

        responseDto = GroupPostDetailResponseDto.builder()
            .result(true)
            .postTitle(post.getGroupPostTitle())
            .postCategory(post.getPostCategory().toString())
            .userName(post.getMember().getMemberName())
            .postContent(post.getGroupPostContent())
            .postTime(post.getGroupPostTime())
            // .postImage()
            .build();

        return responseDto;
    }

    @Override
    public GroupPostDetailResponseDto updateGroupPost(Long postId, GroupPostUpdateRequestDto requestDto) {
        GroupPostDetailResponseDto responseDto = new GroupPostDetailResponseDto();

        GroupPost post = new GroupPost();
        Optional<GroupPost> findPost = groupPostRepository.findById(postId);
        if (findPost.isPresent()) {
            post = findPost.get();
        } else {
            responseDto.setResult(false);
            return responseDto;
        }
        Groups group = post.getGroups();
        Member writer = post.getMember();

        post = GroupPost.builder()
            .groupPostId(postId)
            .groupPostTitle(requestDto.getPostTitle())
            .groupPostContent(requestDto.getPostContent())
            .groupPostTime(requestDto.getPostTime())
            .postCategory(PostCategory.valueOf(requestDto.getPostCategory()))
            .groups(group)
            .member(writer)
            .build();

        //데이터베이스에 수정 적용
        groupPostRepository.save(post);

        responseDto = GroupPostDetailResponseDto.builder()
            .result(true)
            .postTitle(post.getGroupPostTitle())
            .postCategory(post.getPostCategory().toString())
            .userName(post.getMember().getMemberName())
            .postContent(post.getGroupPostContent())
            .postTime(post.getGroupPostTime())
            // .postImage()
            .build();

        return responseDto;
    }

    public ResultResponseDto deleteGroupPost(Long postId) {
        ResultResponseDto resultResponseDto = new ResultResponseDto();
        GroupPost post = new GroupPost();
        Optional<GroupPost> findPost = groupPostRepository.findById(postId);
        if (findPost.isPresent()) {
            post = findPost.get();
        } else {
            resultResponseDto.setResult(false);
            return resultResponseDto;
        }
        groupPostRepository.deleteById(postId);
        resultResponseDto.setResult(true);
        return resultResponseDto;
    }
}
