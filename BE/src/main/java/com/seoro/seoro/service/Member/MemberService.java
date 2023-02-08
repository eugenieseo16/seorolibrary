package com.seoro.seoro.service.Member;

import java.util.List;

import org.springframework.stereotype.Service;

import com.seoro.seoro.domain.dto.Member.LoginDto;
import com.seoro.seoro.domain.dto.Member.MemberDto;
import com.seoro.seoro.domain.dto.Member.MemberPasswordDto;
import com.seoro.seoro.domain.dto.Member.MemberSignupDto;
import com.seoro.seoro.domain.dto.Member.MemberUpdateDto;
import com.seoro.seoro.domain.dto.Member.TokenDto;
import com.seoro.seoro.domain.dto.ResultResponseDto;

@Service
public interface MemberService {
	public ResultResponseDto signupMember(MemberSignupDto requestDto);
	public ResultResponseDto chechNameDuplication(String memberName);
	public ResultResponseDto checkEmailDuplication(String memberEmail);
	public List<MemberDto> findByMemberNameLike(String memberName);
	public MemberDto viewMember(String memberName);
	public MemberDto modifyProfile(MemberUpdateDto requestDto, String memberName);
	public ResultResponseDto modifyPassword(MemberPasswordDto requestDto, String memberName);
	public ResultResponseDto removeMember(String memberName);
	public TokenDto login(LoginDto requestDto);
	public void logout(TokenDto tokenDto, String username);
	public TokenDto reissue(String refreshToken);
}