package com.kh.reactbackend.service;

import com.kh.reactbackend.dto.MemberDto;

import java.util.List;

public interface MemberService {
    String insertMember(MemberDto.Create createDto);
    List<MemberDto.Response> findAllMembers();
    MemberDto.Response findMember(String id);
    MemberDto.Response updateMember(String id, MemberDto.Update updateDto);
    void deleteMember(String id);
}
