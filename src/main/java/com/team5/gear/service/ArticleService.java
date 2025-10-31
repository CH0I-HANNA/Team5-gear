package com.team5.gear.service;

import com.team5.gear.entity.Article;
import com.team5.gear.entity.Category;
import com.team5.gear.repository.ArticleRepository;
import com.team5.gear.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final CategoryRepository categoryRepository;

    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public Optional<Article> getArticleBySlug(String slug) {
        return articleRepository.findBySlug(slug);
    }

    public Article createArticle(Article article) {
        if (article.getCategoryId() != null) {
            Category category = categoryRepository.findById(article.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found with ID: " + article.getCategoryId()));
            article.setCategory(category);
        }
        return articleRepository.save(article);
    }

    public Optional<Article> updateArticle(Long id, Article updatedArticle) {
        return articleRepository.findById(id).map(article -> {
            article.setTitle(updatedArticle.getTitle());
            article.setSlug(updatedArticle.getSlug());
            article.setDescription(updatedArticle.getDescription());
            article.setContent(updatedArticle.getContent());
            article.setAuthor(updatedArticle.getAuthor());
            if (updatedArticle.getCategoryId() != null) {
                Category category = categoryRepository.findById(updatedArticle.getCategoryId())
                        .orElseThrow(() -> new RuntimeException("Category not found with ID: " + updatedArticle.getCategoryId()));
                article.setCategory(category);
            }
            article.setUpdatedAt(LocalDateTime.now());
            return articleRepository.save(article);
        });
    }

    public boolean deleteArticle(Long id) {
        return articleRepository.findById(id).map(article -> {
            articleRepository.delete(article);
            return true;
        }).orElse(false);
    }
}
