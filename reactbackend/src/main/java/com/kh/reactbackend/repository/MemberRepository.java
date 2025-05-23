package com.kh.reactbackend.repository;

import com.kh.reactbackend.entity.Member;
import com.kh.reactbackend.enums.CommonEnums;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    void add(Member member);
    List<Member> findAll(CommonEnums.Status status);
    Optional<Member> find(String id);
}
