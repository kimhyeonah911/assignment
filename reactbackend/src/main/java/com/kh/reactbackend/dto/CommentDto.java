package com.kh.reactbackend.dto;

import com.kh.reactbackend.entity.Comment;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class CommentDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Create{
        private String comment_content;
        private Long board_no;
        private String comment_writer;

        public Comment toEntity(){
            return Comment.builder()
                    .commentContent(this.comment_content)
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response{
        private Long comment_no;
        private Long board_no;
        private String comment_writer;
        private String comment_content;
        private String create_date;

        public static Response toDto(Comment comment){
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            return Response.builder()
                    .comment_no(comment.getCommentNo())
                    .board_no(comment.getBoard().getBoardNo())
                    .comment_writer(comment.getMember().getUserId())
                    .comment_content(comment.getCommentContent())
                    .create_date(comment.getCreateDate().format(formatter))
                    .build();
        }
    }
}
