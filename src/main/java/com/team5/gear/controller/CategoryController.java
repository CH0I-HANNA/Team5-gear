package com.team5.gear.controller;

import com.team5.gear.entity.Article;
import com.team5.gear.entity.Category;
import com.team5.gear.repository.CategoryRepository;
import com.team5.gear.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

    private final ArticleService articleService;

    private final CategoryRepository categoryRepository;

    @GetMapping("/{slug}/articles")
    public ResponseEntity<List<Article>> getArticlesByCategorySlug(@PathVariable("slug") String slug) {
        List<Article> articles = articleService.getArticlesByCategorySlug(slug);
        return ResponseEntity.ok(articles);
    }

    // ✅ 새 기능: 전체 카테고리 목록
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return ResponseEntity.ok(categories);
    }


}
