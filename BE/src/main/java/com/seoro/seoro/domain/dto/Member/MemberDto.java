package com.seoro.seoro.domain.dto.Member;

import java.util.Date;

import com.seoro.seoro.domain.entity.Member.LoginType;
import com.seoro.seoro.domain.entity.Member.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberDto {
	private boolean result;
	private Long memberId;
	private String memberEmail;
	private String memberName;
	private String memberProfile;
	private String memberDongCode;
	private Integer memberScore;
	private int[] memberGenre;

	public MemberDto(Member member) {
		this.result = true;
		this.memberId = member.getMemberId();
		this.memberEmail = member.getMemberEmail();
		this.memberName = member.getMemberName();
		this.memberProfile = member.getMemberProfile();
		this.memberDongCode = member.getMemberDongCode();
		this.memberScore = member.getMemberScore();
//		this.memberGenre = member.getMemberGenre();
	}

	public boolean getResult() {
		return result;
	}
}
