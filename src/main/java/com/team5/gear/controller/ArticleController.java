package com.team5.gear.controller;

import com.team5.gear.entity.Article;
import com.team5.gear.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // Next.js 프론트엔드 허용
public class ArticleController {

    private final ArticleService articleService;

    // ✅ 전체 기사 조회
    @GetMapping
    public ResponseEntity<List<Article>> getAllArticles() {
        List<Article> articles = articleService.getAllArticles();
        return ResponseEntity.ok(articles);
    }

    // ✅ 단일 기사 조회 (slug 기반)
    @GetMapping("/{slug}")
    public ResponseEntity<?> getArticleBySlug(@PathVariable("slug") String slug) {
        return articleService.getArticleBySlug(slug)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "해당 slug의 기사를 찾을 수 없습니다.")));
    }

    // ✅ 카테고리별 기사 조회
    @GetMapping("/category/{slug}")
    public ResponseEntity<?> getArticlesByCategory(@PathVariable("slug") String slug) {
        List<Article> articles = articleService.getArticlesByCategorySlug(slug);

        if (articles.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "이 카테고리에는 아직 기사가 없습니다."));
        }

        return ResponseEntity.ok(articles);
    }

    // ✅ 기사 등록
    @PostMapping
    public ResponseEntity<Article> createArticle(@RequestBody Article article) {
        Article createdArticle = articleService.createArticle(article);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdArticle);
    }

    // ✅ 기사 수정
    @PutMapping("/{id}")
    public ResponseEntity<?> updateArticle(@PathVariable("id") Long id, @RequestBody Article article) {
        return articleService.updateArticle(id, article)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "해당 ID의 기사를 찾을 수 없습니다.")));
    }

    // ✅ 기사 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteArticle(@PathVariable("id") Long id) {
        if (articleService.deleteArticle(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", "해당 ID의 기사를 찾을 수 없습니다."));
    }
}
