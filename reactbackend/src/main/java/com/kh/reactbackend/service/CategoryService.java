package com.kh.reactbackend.service;

import com.kh.reactbackend.dto.CategoryDto;
import com.kh.reactbackend.dto.CommentDto;
import com.kh.reactbackend.enums.CommonEnums;
import com.kh.reactbackend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryService {
    private final CategoryRepository categoryRepository;
    public List<CategoryDto.Response> getAllCategorys() {
        return categoryRepository.findAll().stream()
                .map(CategoryDto.Response::toDto)
                .collect(Collectors.toList());
    }
}
