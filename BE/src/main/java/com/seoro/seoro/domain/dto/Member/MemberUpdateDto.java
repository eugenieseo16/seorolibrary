package com.seoro.seoro.domain.dto.Member;

import com.seoro.seoro.domain.entity.Member.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberUpdateDto {
	private boolean result;
	private String memberName;
	private String memberProfile;
	private String memberDongCode;
	private Long memberGenre;

	public MemberUpdateDto(Member member) {
		this.memberName = member.getMemberName();
		this.memberProfile = member.getMemberProfile();
		this.memberDongCode = member.getMemberDongCode();
		this.memberGenre = member.getMemberGenre();
	}
}
