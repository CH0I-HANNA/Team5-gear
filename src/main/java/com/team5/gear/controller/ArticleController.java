package com.team5.gear.controller;

import com.team5.gear.entity.Article;
import com.team5.gear.entity.Equipment;
import com.team5.gear.service.ArticleService;
import com.team5.gear.service.EquipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // 프론트엔드 허용
public class ArticleController {

    private final ArticleService articleService;
    private final EquipmentService equipmentService; // ✅ 추가

    // ✅ 전체 기사 조회
    @GetMapping
    public ResponseEntity<List<Article>> getAllArticles() {
        return ResponseEntity.ok(articleService.getAllArticles());
    }

    // ✅ 단일 기사 조회
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
        var articles = articleService.getArticlesByCategorySlug(slug);
        if (articles.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "이 카테고리에는 아직 기사가 없습니다."));
        }
        return ResponseEntity.ok(articles);
    }

    // ✅ 기사별 연결된 장비 조회 (새로 추가)
    @GetMapping("/{slug}/equipments")
    public ResponseEntity<?> getEquipmentsByArticleSlug(@PathVariable("slug") String slug) {
        List<Equipment> equipments = equipmentService.getEquipmentsByArticleSlug(slug);

        if (equipments.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "이 기사에 연결된 장비가 없습니다."));
        }

        return ResponseEntity.ok(equipments);
    }

    // ✅ 기사 등록
    @PostMapping
    public ResponseEntity<Article> createArticle(@RequestBody Article article) {
        return ResponseEntity.status(HttpStatus.CREATED).body(articleService.createArticle(article));
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
