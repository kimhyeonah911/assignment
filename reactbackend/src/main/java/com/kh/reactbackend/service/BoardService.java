package com.kh.reactbackend.service;

import com.kh.reactbackend.dto.BoardDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardService {
    Page<BoardDto.Response> getAllBoards(Pageable pageable);
    BoardDto.Response getBoard(Long boardNo);
    Long createBoard(BoardDto.Create createDto);
    BoardDto.Response updateBoard(Long boardNo, BoardDto.Update updateDto);
    void deleteBoard(Long boardNo);
}
