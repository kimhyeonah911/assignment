package com.kh.reactbackend.service;

import com.kh.reactbackend.dto.MemberDto;
import com.kh.reactbackend.entity.Member;
import com.kh.reactbackend.enums.CommonEnums;
import com.kh.reactbackend.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;

    @Override
    public String insertMember(MemberDto.Create createDto) {
        Member member = createDto.toEntity();
        memberRepository.add(member);
        return member.getUserId();
    }

    @Override
    public List<MemberDto.Response> findAllMembers() {
        return memberRepository.findAll(CommonEnums.Status.Y).stream()
                .map(MemberDto.Response::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public MemberDto.Response findMember(String id) {
        return memberRepository.find(id)
                .map(MemberDto.Response::toDto)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));
    }

    @Override
    public MemberDto.Response updateMember(String id, MemberDto.Update updateDto) {
        Member member = memberRepository.find(id)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));
        member.changeName(updateDto.getUser_name());
        member.changePwd(updateDto.getUser_pwd());
        return MemberDto.Response.toDto(member);
    }

    @Override
    public void deleteMember(String id) {
        Member member = memberRepository.find(id)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));
        member.changeStatus();
    }
}
