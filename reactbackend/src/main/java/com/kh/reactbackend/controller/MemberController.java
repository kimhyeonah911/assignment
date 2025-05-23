package com.kh.reactbackend.controller;

import com.kh.reactbackend.dto.MemberDto;
import com.kh.reactbackend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MemberController {
    private final MemberService memberService;

    @GetMapping
    public ResponseEntity<List<MemberDto.Response>> getMembers() {
        return ResponseEntity.ok(memberService.findAllMembers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MemberDto.Response> getMember(@PathVariable String id) {
        return ResponseEntity.ok(memberService.findMember(id));
    }

    @PostMapping
    public ResponseEntity<String> insertMember(@RequestBody MemberDto.Create createDto) {
        return ResponseEntity.ok(memberService.insertMember(createDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MemberDto.Response> updateMember(@PathVariable String id, @RequestBody MemberDto.Update updateDto) {
        System.out.println(updateDto.getUser_name());
        System.out.println(updateDto.getUser_id());
        System.out.println(updateDto.getUser_pwd());
        return ResponseEntity.ok(memberService.updateMember(id, updateDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable String id) {
        memberService.deleteMember(id);
        return ResponseEntity.ok().build();
    }
}
