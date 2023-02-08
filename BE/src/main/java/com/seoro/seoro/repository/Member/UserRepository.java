package com.seoro.seoro.repository.Member;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seoro.seoro.domain.entity.Member.Member;

@Repository
public interface UserRepository extends JpaRepository<Member, Long> {
	List<Member> findByMemberNameLike(String userName);

	List<Member> findByMemberDongCode(String myDongCode);

	Member findByMemberName(String userName);
}
