package com.seoro.seoro.service.GroupPost;

import com.seoro.seoro.domain.dto.GroupPost.*;
import com.seoro.seoro.domain.dto.ResultResponseDto;
import com.seoro.seoro.domain.entity.Groups.*;
import com.seoro.seoro.domain.entity.Member.Member;
import com.seoro.seoro.repository.Group.GroupRepository;
import com.seoro.seoro.repository.GroupPost.GroupPostPhotoRespository;
import com.seoro.seoro.repository.GroupPost.GroupPostRepository;
import com.seoro.seoro.repository.Member.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.boot.json.JsonParser;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GroupPostServiceImpl implements GroupPostService {
    private final MemberRepository memberRepository;
    private final GroupPostRepository groupPostRepository;
    private final GroupRepository groupRepository;
    private final GroupPostPhotoRespository groupPostPhotoRespository;

    @Override
    public ResultResponseDto createGroupPost(GroupPostCreateRequestDto requestDto) {
        ResultResponseDto resultResponseDto = new ResultResponseDto();
        System.out.println("writer : " + requestDto.getWriter());

        //작성자 확인
        Optional<Member> findUser = memberRepository.findById(requestDto.getWriter());
        Member writer = new Member();
        if(findUser.isPresent()) {
            writer = findUser.get();
        } else {
            resultResponseDto.setResult(false);
            return resultResponseDto;
        }
        System.out.println("writer : " + writer.getMemberName());
        //그룹 확인
        Optional<Groups> findGroup = groupRepository.findById(requestDto.getGroupId());
        Groups group = new Groups();
        if(findGroup.isPresent()) {
            group = findGroup.get();
        } else {
            resultResponseDto.setResult(false);
            return resultResponseDto;
        }


        GroupPost saveGroupPost = GroupPost.builder()
                .groupPostTitle(requestDto.getPostTitle())
                .groupPostContent(requestDto.getPostContent())
                .groups(group)
                .postCategory(PostCategory.valueOf(requestDto.getPostCategory()))
                .member(writer)
                .isUpdate(false)
//                .photos()
                .build();
        groupPostRepository.save(saveGroupPost);

        //사진이 있을 때
        List<GroupPostPhoto> photos = new ArrayList<>();
        if(requestDto.getPostImage() != null && requestDto.getPostImage().length > 0) {
            for(String p : requestDto.getPostImage()) {
                GroupPostPhoto photo = GroupPostPhoto.builder()
                    .groupPostPhoto(p)
                    .groupPost(saveGroupPost)
                    .build();
                groupPostPhotoRespository.save(photo);
            }
        }
        resultResponseDto.setResult(true);
        return resultResponseDto;
    }

    @Override
    public GroupPostReadResponseDto readGroupPost(Long groupId, PostCategory postCategory, int startIdx, int limit) {
        GroupPostReadResponseDto responseDto = new GroupPostReadResponseDto();

        //그룹 정보 가져오기
        Groups group = new Groups();
        Optional<Groups> findGroup = groupRepository.findById(groupId);
        if(findGroup.isPresent()) {
            group = findGroup.get();
        } else {
            responseDto.setResult(false);
            return responseDto;
        }

        //그룹의 게시글 가져오기 - 최근 작성한 게시글부터 정렬 && pagenation
        List<GroupPost> posts = new ArrayList<>();
        if(PostCategory.valueOf(postCategory.name()).equals(PostCategory.ALL)) {
            //모든 게시물 출력
            posts = groupPostRepository.findAllByGroupsOrderByGroupPostTimeDesc(group);
        }
        else {
            posts = groupPostRepository.findGroupPostsByGroupsAndPostCategoryOrderByGroupPostTimeDesc(group, PostCategory.valueOf(postCategory.name()));
        }

        List<GroupPostDto> groupPost = new ArrayList<>();
        for(int i=startIdx-1; i< startIdx + limit-1; i++) {
            if(posts.size() == i) {
                break;
            }
            GroupPost p = posts.get(i);
            GroupPostDto gpd = GroupPostDto.builder()
                .postId(p.getGroupPostId())
                .postTitle(p.getGroupPostTitle())
                .postTime(p.getGroupPostTime())
                .isUpdate(p.getIsUpdate())
                .postCategory(p.getPostCategory().toString())
                .memberId(p.getMember().getMemberId())
                .memberName(p.getMember().getMemberName())
                .memberProfile(p.getMember().getMemberProfile())
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
//            .postTime(post.getGroupPostTime())
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
        LocalDateTime time = post.getGroupPostTime();
        List<GroupPostPhoto> photos = post.getPhotos();
        //지금 저장되어 있는 사진 지우기
        for(GroupPostPhoto photo : photos) {
            groupPostPhotoRespository.deleteById(photo.getGroupPostPhotoId());
        }

        List<GroupPostPhoto> updatePhoto = new ArrayList<>();
        //수정한 사진 저장하기
        for(int i=0; i<requestDto.getPostImage().length; i++) {
            GroupPostPhoto p = GroupPostPhoto.builder()
                    .groupPost(post)
                    .groupPostPhoto(requestDto.getPostImage()[i])
                    .build();
            groupPostPhotoRespository.save(p);
            updatePhoto.add(p);
        }

        post = GroupPost.builder()
            .groupPostId(postId)
            .groupPostTitle(requestDto.getPostTitle())
            .groupPostContent(requestDto.getPostContent())
            .photos(updatePhoto)
            .groupPostTime(time)
            .isUpdate(true)
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
            .isUpdate(post.getIsUpdate())
            .postImage(requestDto.getPostImage())
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
