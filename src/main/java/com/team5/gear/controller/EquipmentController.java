package com.team5.gear.controller;

import com.team5.gear.entity.Article;
import com.team5.gear.entity.Category;
import com.team5.gear.entity.Equipment;
import com.team5.gear.repository.ArticleRepository;
import com.team5.gear.repository.CategoryRepository;
import com.team5.gear.repository.EquipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/equipment")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class EquipmentController {

    private final EquipmentRepository equipmentRepository;
    private final CategoryRepository categoryRepository;
    private final ArticleRepository articleRepository;

    // ✅ 수동 입력용 API (JPA 연관관계 기반)
    @PostMapping("/manual-insert")
    public ResponseEntity<String> manualInsert(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam String imageUrl,
            @RequestParam String purchaseUrl,
            @RequestParam int price,
            @RequestParam Long categoryId,
            @RequestParam Long articleId
    ) {
        try {
            Equipment equipment = new Equipment();
            equipment.setName(name);
            equipment.setDescription(description);
            equipment.setImageUrl(imageUrl);
            equipment.setPurchaseUrl(purchaseUrl);
            equipment.setPrice(price);

            // ✅ Category, Article 엔티티 주입
            Category category = categoryRepository.findById(categoryId).orElse(null);
            Article article = articleRepository.findById(articleId).orElse(null);

            equipment.setCategory(category);
            equipment.setArticle(article);

            equipmentRepository.save(equipment);

            return ResponseEntity.ok("장비 데이터가 DB에 성공적으로 저장되었습니다.");

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("DB 저장 중 오류 발생: " + e.getMessage());
        }
    }
}
