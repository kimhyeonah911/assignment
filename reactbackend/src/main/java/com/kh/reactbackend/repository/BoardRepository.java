package com.kh.reactbackend.repository;

import com.kh.reactbackend.entity.Board;
import com.kh.reactbackend.enums.CommonEnums;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface BoardRepository {
    PageImpl<Board> findAll(CommonEnums.Status status,Pageable pageable);
    Optional<Board> findByNo(Long boardNo);
    void add(Board board);
}
