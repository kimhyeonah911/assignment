package com.kh.reactbackend.dto;

import com.kh.reactbackend.entity.Board;
import com.kh.reactbackend.entity.Category;
import lombok.*;

public class CategoryDto {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response{
        private Long category_no;
        private String category_name;

        public static CategoryDto.Response toDto(Category category){
            return Response.builder()
                    .category_no(category.getCategoryNo())
                    .category_name(category.getCategoryName())
                    .build();
        }
    }
}
