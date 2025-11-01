package com.team5.gear.service;

import com.team5.gear.dto.CommentResponse;
import com.team5.gear.entity.Article;
import com.team5.gear.entity.Comment;
import com.team5.gear.entity.User;
import com.team5.gear.repository.ArticleRepository;
import com.team5.gear.repository.CommentRepository;
import com.team5.gear.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    // 간단한 버전: 파라미터로 userId, content 받기
    public CommentResponse createCommentSimple(Long articleId, Long userId, String content) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("Article not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Comment comment = Comment.builder()
                .article(article)
                .user(user)
                .content(content)
                .build();

        Comment saved = commentRepository.save(comment);

        return CommentResponse.builder()
                .id(saved.getId())
                .content(saved.getContent())
                .username(user.getUsername())
                .email(user.getEmail())
                .createdAt(saved.getCreatedAt())
                .build();
    }

    public List<CommentResponse> getComments(Long articleId) {
        return commentRepository.findByArticleId(articleId)
                .stream()
                .map(c -> CommentResponse.builder()
                        .id(c.getId())
                        .content(c.getContent())
                        .username(c.getUser().getUsername())
                        .email(c.getUser().getEmail())
                        .createdAt(c.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }
}
