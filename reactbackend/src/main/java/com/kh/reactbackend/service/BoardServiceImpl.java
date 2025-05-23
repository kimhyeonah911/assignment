package com.kh.reactbackend.service;

import com.kh.reactbackend.dto.BoardDto;
import com.kh.reactbackend.entity.Board;
import com.kh.reactbackend.entity.Category;
import com.kh.reactbackend.entity.Member;
import com.kh.reactbackend.enums.CommonEnums;
import com.kh.reactbackend.repository.BoardRepository;
import com.kh.reactbackend.repository.CategoryRepository;
import com.kh.reactbackend.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardServiceImpl implements BoardService {
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public Page<BoardDto.Response> getAllBoards(Pageable pageable) {
        return boardRepository.findAll(CommonEnums.Status.Y, pageable).map(BoardDto.Response::toSimpleDto);
    }

    @Override
    public BoardDto.Response getBoard(Long boardNo) {
        Board board = boardRepository.findByNo(boardNo)
                .orElseThrow(() -> new EntityNotFoundException("게시물을 찾을 수 없습니다."));

        board.changeCount();  // 조회수 증가 (엔티티 상태 변경)

        return BoardDto.Response.toDto(board);  // 바로 변환해서 리턴
    }


    @Override
    public Long createBoard(BoardDto.Create createDto) {
        Member member = memberRepository.find(createDto.getBoard_writer())
                .orElseThrow(() -> new EntityNotFoundException("유저 정보를 찾을 수 없습니다."));
        Board board = createDto.toEntity();
        board.changeMember(member);

        Category category = categoryRepository.findByNo(createDto.getCategory_no());
        board.changeCategory(category);

        boardRepository.add(board);
        return board.getBoardNo();
    }

    @Override
    public BoardDto.Response updateBoard(Long boardNo, BoardDto.Update updateDto) {
        Board board = boardRepository.findByNo(boardNo)
                .orElseThrow(() -> new EntityNotFoundException("게시물을 찾을 수 없습니다."));

        board.changeBoardTitle(updateDto.getBoard_title());
        board.changeBoardContent(updateDto.getBoard_content());
        Category category = categoryRepository.findByNo(updateDto.getCategory_no());
        board.changeCategory(category);

        return BoardDto.Response.toDto(board);
    }

    @Override
    public void deleteBoard(Long boardNo) {
        Board board = boardRepository.findByNo(boardNo)
                .orElseThrow(() -> new EntityNotFoundException("게시물을 찾을 수 없습니다."));

        board.changeStatus();
    }
}
