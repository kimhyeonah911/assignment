package com.kh.reactbackend.service;

import com.kh.reactbackend.dto.CommentDto;

import java.util.List;

public interface CommentService {
    List<CommentDto.Response> getAllComments();
    List<CommentDto.Response> getComments(Long boardNo);
    Long createComment(CommentDto.Create createDto);
    void deleteComment(Long commentNo);
}
