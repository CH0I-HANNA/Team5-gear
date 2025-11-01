package com.team5.gear.service;

import com.team5.gear.entity.Article;
import com.team5.gear.entity.Comment;
import com.team5.gear.entity.User;
import com.team5.gear.repository.ArticleRepository;
import com.team5.gear.repository.CommentRepository;
import com.team5.gear.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    public CommentService(CommentRepository commentRepository, ArticleRepository articleRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
    }

    public Comment addComment(Long articleId, Long userId, String content) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        Comment comment = Comment.builder()
                .article(article)
                .user(user)
                .content(content)
                .build();

        return commentRepository.save(comment);
    }

    public List<Comment> getComments(Long articleId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));
        return commentRepository.findByArticleOrderByCreatedAtDesc(article);
    }
}
