package com.kh.reactbackend.service;


import com.kh.reactbackend.dto.CommentDto;
import com.kh.reactbackend.entity.Board;
import com.kh.reactbackend.entity.Comment;
import com.kh.reactbackend.entity.Member;
import com.kh.reactbackend.enums.CommonEnums;
import com.kh.reactbackend.repository.BoardRepository;
import com.kh.reactbackend.repository.CommentRepository;
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
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;

    @Override
    public List<CommentDto.Response> getAllComments() {
        return commentRepository.findAll(CommonEnums.Status.Y).stream()
                .map(CommentDto.Response::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CommentDto.Response> getComments(Long boardNo) {
        return commentRepository.findByBoardNo(CommonEnums.Status.Y, boardNo).stream()
                .map(CommentDto.Response::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Long createComment(CommentDto.Create createDto) {
        Board board = boardRepository.findByNo(createDto.getBoard_no())
                .orElseThrow(() -> new EntityNotFoundException("게시글 정보를 찾을 수 없습니다."));
        Member member = memberRepository.find(createDto.getComment_writer())
                .orElseThrow(() -> new EntityNotFoundException("작성자 정보를 찾을 수 없습니다."));

        Comment comment = createDto.toEntity();
        comment.changeBoard(board);
        comment.changeMember(member);

        commentRepository.add(comment);
        return comment.getCommentNo();
    }

    @Override
    public void deleteComment(Long commentNo) {
        Comment comment = commentRepository.findByCommentNo(commentNo)
                .orElseThrow(() -> new EntityNotFoundException("댓글 정보를 찾을 수 없습니다."));
        commentRepository.delete(comment);
    }
}
