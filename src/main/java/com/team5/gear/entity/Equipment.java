package com.team5.gear.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "equipment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "equipment_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "purchase_url")
    private String purchaseUrl;

    @Column(name = "price")
    private Integer price;

    @Column(name = "brand")
    private String brand;

    // ✅ Category 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    // ✅ Article 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ✅ 생성/수정 시간 자동 처리
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
