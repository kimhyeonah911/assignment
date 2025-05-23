package com.kh.reactbackend.repository;

import com.kh.reactbackend.entity.Comment;
import com.kh.reactbackend.enums.CommonEnums;

import java.util.List;
import java.util.Optional;

public interface CommentRepository {
    List<Comment> findAll(CommonEnums.Status status);
    List<Comment> findByBoardNo(CommonEnums.Status status, Long boardNo);
    void add(Comment comment);
    Optional<Comment> findByCommentNo(Long commentNo);
    void delete(Comment comment);
}
