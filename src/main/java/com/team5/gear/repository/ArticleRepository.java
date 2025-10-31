package com.team5.gear.repository;

import com.team5.gear.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    Optional<Article> findBySlug(String slug);

    @Query("SELECT a FROM Article a WHERE a.category.slug = :slug")
    List<Article> findByCategorySlug(@Param("slug") String slug);
}
