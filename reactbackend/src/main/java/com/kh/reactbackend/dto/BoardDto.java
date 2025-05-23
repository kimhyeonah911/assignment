package com.kh.reactbackend.dto;

import com.kh.reactbackend.entity.Board;
import lombok.*;

import java.time.format.DateTimeFormatter;

public class BoardDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Create{
        private Long board_no;
        private String board_title;
        private String board_content;
        private String board_writer;
        private Long category_no;

        public Board toEntity(){
            return Board.builder()
                    .boardTitle(this.board_title)
                    .boardContent(this.board_content)
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response{
        private Long board_no;
        private String board_title;
        private String board_content;
        private String board_writer;
        private Long category_no;
        private Integer count;
        private String create_date;

        public static Response toDto(Board board){
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            return Response.builder()
                    .board_no(board.getBoardNo())
                    .board_title(board.getBoardTitle())
                    .board_content(board.getBoardContent())
                    .board_writer(board.getMember().getUserId())
                    .category_no(board.getCategory().getCategoryNo())
                    .count(board.getCount())
                    .create_date(board.getCreateDate().format(formatter))
                    .build();
        }

        public static Response toSimpleDto(Board board){
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            return Response.builder()
                    .board_no(board.getBoardNo())
                    .board_title(board.getBoardTitle())
                    .board_writer(board.getMember().getUserId())
                    .category_no(board.getCategory().getCategoryNo())
                    .count(board.getCount())
                    .create_date(board.getCreateDate().format(formatter))
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Update{
        private String board_title;
        private String board_content;
        private Long category_no;
    }
}
