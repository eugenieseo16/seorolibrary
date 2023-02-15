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
public class MemberShowDto {
	private String memberName;
	private String memberProfile;

	public MemberShowDto(Member member) {
		this.memberName = member.getMemberName();
		this.memberProfile = member.getMemberProfile();
	}
}
