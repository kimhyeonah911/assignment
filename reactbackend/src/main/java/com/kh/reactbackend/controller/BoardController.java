package com.kh.reactbackend.controller;

import com.kh.reactbackend.dto.BoardDto;
import com.kh.reactbackend.dto.PageResponse;
import com.kh.reactbackend.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BoardController {
    private final BoardService boardService;

    @GetMapping
    public ResponseEntity<PageResponse<BoardDto.Response>> getAllBoards(@PageableDefault(size = 10, sort = "createDate", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(new PageResponse<>(boardService.getAllBoards(pageable)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoardDto.Response> getBoard(@PathVariable("id") Long boardNo) {
        return ResponseEntity.ok(boardService.getBoard(boardNo));
    }

    @PostMapping
    public ResponseEntity<Long> createBoard(@RequestBody BoardDto.Create createDto) {
        return ResponseEntity.ok(boardService.createBoard(createDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BoardDto.Response> updateBoard(@PathVariable("id") Long boardNo, @RequestBody BoardDto.Update updateDto) {
        return ResponseEntity.ok(boardService.updateBoard(boardNo, updateDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable("id") Long boardNo) {
        System.out.println(boardNo);
        boardService.deleteBoard(boardNo);
        return ResponseEntity.ok().build();
    }
}
