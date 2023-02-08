package com.seoro.seoro.repository.Member;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seoro.seoro.domain.entity.Member.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
	List<Member> findByMemberNameLike(String memberName);
	List<Member> findByMemberDongCode(String myDongCode);
	Optional<Member> findByMemberName(String memberName);
	Optional<Member> findByMemberEmail(String memberEmail);
	void deleteByMemberName(String memberName);
	boolean existsByMemberName(String memberName);
	boolean existsByMemberEmail(String memberEmail);
}
