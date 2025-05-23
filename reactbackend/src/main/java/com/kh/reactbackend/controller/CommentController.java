package com.kh.reactbackend.controller;

import com.kh.reactbackend.dto.CommentDto;
import com.kh.reactbackend.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CommentController {
    private final CommentService commentService;

    @GetMapping
    public ResponseEntity<List<CommentDto.Response>> getAllComments() {
        return ResponseEntity.ok(commentService.getAllComments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<CommentDto.Response>> getComments(@PathVariable("id") Long boardNo) {
        return ResponseEntity.ok(commentService.getComments(boardNo));
    }

    @PostMapping
    public ResponseEntity<Long> createComment(@RequestBody CommentDto.Create createDto) {
        System.out.println(createDto.getComment_content());
        System.out.println(createDto.getComment_writer());
        System.out.println(createDto.getBoard_no());
        return ResponseEntity.ok(commentService.createComment(createDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<CommentDto.Response>> deleteComments(@PathVariable("id") Long commentNo) {
        System.out.println(commentNo);
        commentService.deleteComment(commentNo);
        return ResponseEntity.ok().build();
    }
}
