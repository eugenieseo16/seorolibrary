package com.seoro.seoro.service.GroupPost;

import com.seoro.seoro.domain.dto.Group.GroupDetailResponseDto;
import com.seoro.seoro.domain.dto.Group.GroupMainResponseDto;
import com.seoro.seoro.domain.dto.Group.GroupSignupRequestDto;
import com.seoro.seoro.domain.dto.GroupPost.GroupPostCreateRequestDto;
import com.seoro.seoro.domain.dto.GroupPost.GroupPostDetailResponseDto;
import com.seoro.seoro.domain.dto.GroupPost.GroupPostDto;
import com.seoro.seoro.domain.dto.GroupPost.GroupPostReadResponseDto;
import com.seoro.seoro.domain.dto.GroupPost.GroupPostUpdateRequestDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.domain.entity.Groups.*;
import com.seoro.seoro.domain.entity.User.User;
import com.seoro.seoro.repository.ChatRoom.ChatRepository;
import com.seoro.seoro.repository.Group.GroupJoinRepository;
import com.seoro.seoro.repository.Group.GroupRepository;
import com.seoro.seoro.repository.GroupPost.GroupPostRepository;
import com.seoro.seoro.repository.User.UserRepository;
import com.seoro.seoro.service.Group.GroupService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        Optional<User> findUser = userRepository.findById(requestDto.getWriter());
        User writer = new User();
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
                .user(writer)
//                .photos()
                .build();
        groupPostRepository.save(saveGroupPost);
        resultResponseDto.setResult(true);
        return resultResponseDto;
    }

    @Override
    public GroupPostReadResponseDto readGroupPost(Long groupId) {
        GroupPostReadResponseDto responseDto = new GroupPostReadResponseDto();
        //그룹 정보 가져오기
        Groups group = new Groups();
        System.out.println("groupId = " + groupId);
        Optional<Groups> findGroup = groupRepository.findById(groupId);
        if(findGroup.isPresent()) {
            group = findGroup.get();
        } else {
            responseDto.setResult(false);
            return responseDto;
        }
        
        //그룹의 게시글 가져오기
        List<GroupPost> posts = group.getPosts();
        List<GroupPostDto> groupPost = new ArrayList<>();
        for(GroupPost p : posts) {
            GroupPostDto gpd = GroupPostDto.builder()
                    .postTitle(p.getGroupPostTitle())
                    .postTime(p.getGroupPostTime())
                    .postCategory(p.getPostCategory().toString())
                    .userName(p.getUser().getUserName())
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
            .userName(post.getUser().getUserName())
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
        if(findPost.isPresent()) {
            post = findPost.get();
        } else {
            responseDto.setResult(false);
            return responseDto;
        }
        Groups group = post.getGroups();
        User writer = post.getUser();

        post = GroupPost.builder()
            .groupPostId(postId)
            .groupPostTitle(requestDto.getPostTitle())
            .groupPostContent(requestDto.getPostContent())
            .groupPostTime(requestDto.getPostTime())
            .postCategory(PostCategory.valueOf(requestDto.getPostCategory()))
            .groups(group)
            .user(writer)
            .build();

        //데이터베이스에 수정 적용
        groupPostRepository.save(post);

        responseDto = GroupPostDetailResponseDto.builder()
            .result(true)
            .postTitle(post.getGroupPostTitle())
            .postCategory(post.getPostCategory().toString())
            .userName(post.getUser().getUserName())
            .postContent(post.getGroupPostContent())
            .postTime(post.getGroupPostTime())
            // .postImage()
            .build();

        return responseDto;
    }
}
