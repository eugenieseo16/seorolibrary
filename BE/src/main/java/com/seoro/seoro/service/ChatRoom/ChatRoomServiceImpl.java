package com.seoro.seoro.service.ChatRoom;

import java.lang.module.FindException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Chat.ChatContentDto;
import com.seoro.seoro.domain.dto.Chat.ChatRoomCreateRequestDto;
import com.seoro.seoro.domain.dto.Chat.ChatRoomCreateResponseDto;
import com.seoro.seoro.domain.dto.Chat.ChatRoomDetailResponseDto;
import com.seoro.seoro.domain.dto.Chat.ChatRoomReadResponseDto;
import com.seoro.seoro.domain.dto.Chat.ChatRoomShortDto;
import com.seoro.seoro.domain.entity.ChatRoom.ChatRoom;
import com.seoro.seoro.domain.entity.ChatRoom.ChatRoomContent;
import com.seoro.seoro.domain.entity.ChatRoom.ChatRoomJoin;
import com.seoro.seoro.domain.entity.ChatRoom.ContentDetail;
import com.seoro.seoro.domain.entity.Member.Member;
import com.seoro.seoro.repository.ChatRoom.ChatRoomContentRepository;
import com.seoro.seoro.repository.ChatRoom.ChatRoomJoinRepository;
import com.seoro.seoro.repository.ChatRoom.ChatRoomRepository;
import com.seoro.seoro.repository.ChatRoom.ContentDetailRepository;
import com.seoro.seoro.repository.Member.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {
	private final ChatRoomRepository chatRoomRepository;
	private final ChatRoomJoinRepository chatRoomJoinRepository;
	private final MemberRepository memberRepository;
	private final ChatRoomContentRepository chatRoomContentRepository;
	private final ContentDetailRepository contentDetailRepository;

	@Override
	public ChatRoomReadResponseDto chatRoomList(Long memberId) {
		ChatRoomReadResponseDto responseDto = new ChatRoomReadResponseDto();
		//현재 사용자 정보 가져오기
		Member member = new Member();
		Optional<Member> findMember = memberRepository.findById(memberId);
		if(findMember.isPresent()) {
			member = findMember.get();
		} else {
			responseDto.setResult(false);
			return responseDto;
		}

		List<ChatRoomShortDto> chatRoomShortDtos = new ArrayList<>();
		List<ChatRoomJoin> chatRoomJoins = chatRoomJoinRepository.findAllByMember(member);
		for(ChatRoomJoin joins : chatRoomJoins) {
			ChatRoom chatRoom = joins.getChatRoom();
			ChatRoomJoin chatRoomJoin = chatRoomJoinRepository.findChatRoomJoinByChatRoomAndMemberNot(chatRoom, member);
			List<ChatRoomContent> chatRoomContent = chatRoomContentRepository.findChatRoomContentByChatRoomOrderByTimeDesc(chatRoom);
			ContentDetail latestM = null;
			if(chatRoomContent.size() > 0) {
				Optional<ContentDetail> contentDetail = contentDetailRepository.findById(chatRoomContent.get(0).getChatRoomContentId());
				if(contentDetail.isPresent()) {
					latestM = contentDetail.get();
				}
			}
			ChatRoomShortDto shortDto = ChatRoomShortDto.builder()
				.chatRoomId(chatRoom.getChatRoomId())
				.otherUserId(chatRoomJoin.getMember().getMemberId())
				.otherUserName(chatRoomJoin.getMember().getMemberName())
				.latestMessage(latestM.getContentDetail())
				.latestMessageTime(chatRoomContent.get(0).getTime())
				.build();
			chatRoomShortDtos.add(shortDto);
		}

		responseDto.setResult(true);
		responseDto.setChatRooms(chatRoomShortDtos);
		return responseDto;
	}

	@Override
	public ChatRoomCreateResponseDto createChatRoom(ChatRoomCreateRequestDto requestDto) {
		ChatRoomCreateResponseDto responseDto = new ChatRoomCreateResponseDto();
		//사용자 정보 가져오기
		Optional<Member> tmpMe = memberRepository.findById(requestDto.getUserId());
		Optional<Member> tmpOther = memberRepository.findById(requestDto.getOtherUserId());
		Member me = new Member();
		Member other = new Member();
		if(tmpMe.isPresent()) {
			me = tmpMe.get();
		} else {
			responseDto.setResult(false);
			return responseDto;
		}
		if(tmpOther.isPresent()) {
			other = tmpOther.get();
		} else {
			responseDto.setResult(false);
			return responseDto;
		}
		
		//이미 존재하는 채팅방인지 확인
		boolean isExist = false;
		ChatRoom existChatRoom = null;
		List<ChatRoomJoin> myChatRoomJoins = chatRoomJoinRepository.findAllByMember(me);
		for(ChatRoomJoin join : myChatRoomJoins) {
			ChatRoom chatRoom = join.getChatRoom();
			ChatRoomJoin otherJoin = chatRoomJoinRepository.findChatRoomJoinByChatRoomAndMemberNot(chatRoom, me);
			if(otherJoin.getMember().equals(other)) {
				isExist = true;
				existChatRoom = chatRoom;
				break;
			}
		}
		if(isExist) {
			responseDto.setResult(true);
			responseDto.setChatRoomId(existChatRoom.getChatRoomId());
			return responseDto;
		}

		//채팅방 새로 만들기
		ChatRoom chatRoom = ChatRoom.builder().build();
		chatRoomRepository.save(chatRoom);

		//채팅방 참여 저장하기
		ChatRoomJoin myJoin = ChatRoomJoin.builder()
			.chatRoom(chatRoom)
			.member(me)
			.build();
		ChatRoomJoin ohterJoin = ChatRoomJoin.builder()
			.chatRoom(chatRoom)
			.member(other)
			.build();
		chatRoomJoinRepository.save(myJoin);
		chatRoomJoinRepository.save(ohterJoin);

		responseDto.setResult(true);
		responseDto.setChatRoomId(chatRoom.getChatRoomId());
		return responseDto;
	}

	@Override
	public ChatRoomDetailResponseDto detailChatRoom(Long chatRoomId) {
		ChatRoomDetailResponseDto responseDto = new ChatRoomDetailResponseDto();
		Optional<ChatRoom> tmpChatRoom = chatRoomRepository.findById(chatRoomId);
		ChatRoom chatRoom = null;
		if(tmpChatRoom.isPresent()) {
			chatRoom = tmpChatRoom.get();
		} else {
			responseDto.setResult(false);
			return responseDto;
		}

		List<ChatRoomContent> chatRoomContents = chatRoomContentRepository.findChatRoomContentByChatRoomOrderByTimeDesc(chatRoom);
		List<ChatContentDto> chattingContent = new ArrayList<>();
		for(ChatRoomContent content: chatRoomContents) {
			Optional<ContentDetail> tmpContentDetail = contentDetailRepository.findById(content.getChatRoomContentId());
			ContentDetail message = null;
			if(tmpContentDetail.isPresent()) {
				message = tmpContentDetail.get();
			}
			ChatContentDto chatContentDto = ChatContentDto.builder()
				.writerId(content.getMember().getMemberId())
				.writerName(content.getMember().getMemberName())
				.message(message.getContentDetail())
				.messageTime(content.getTime())
				.build();

			chattingContent.add(chatContentDto);
		}

		responseDto.setResult(true);
		responseDto.setChattingContent(chattingContent);
		return responseDto;
	}

}
