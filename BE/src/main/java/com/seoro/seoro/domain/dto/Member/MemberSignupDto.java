package com.seoro.seoro.domain.dto.Member;

import java.util.Map;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import com.seoro.seoro.domain.entity.Member.LoginType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class MemberSignupDto {
	@NotBlank(message = "아이디를 입력해주세요")
	@Email(message = "이메일 형식이 올바르지 않습니다.")
	private String memberEmail;
	@NotBlank(message = "닉네임을 입력해주세요")
	// @Pattern(regexp = "^(?=.*[a-z0-9])[a-z0-9][ㄱ-ㅎ가-힣]{3,16}$", message = "길이는 3자 이상 16자 이하여야 합니다.")
	private String memberName;
	@NotBlank(message = "비밀번호를 입력해주세요")
	// @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{5,20}$",
	// 	message = "비밀번호는 7자리 이상, 20자리 이하 자리이면서 1개 이상의 알파벳, 숫자, 특수문자를 포함해야 합니다.")
	private String memberPassword;
	@NotBlank(message = "비밀번호를 확인해주세요")
	private String dupchkPassword;
	private Long memberGenre;
	private String loginType;
	private String memberDongCode;
}
