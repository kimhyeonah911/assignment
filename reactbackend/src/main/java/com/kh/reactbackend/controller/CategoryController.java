package com.kh.reactbackend.controller;

import com.kh.reactbackend.dto.CategoryDto;
import com.kh.reactbackend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorys")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryDto.Response>> getAllCategorys() {
        return ResponseEntity.ok(categoryService.getAllCategorys());
    }
}
