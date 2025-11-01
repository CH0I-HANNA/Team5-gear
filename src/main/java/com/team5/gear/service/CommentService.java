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
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {

    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    @Transactional
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

        return CommentResponse.fromEntity(saved);
    }

    public List<CommentResponse> getComments(Long articleId) {
        return commentRepository.findByArticleId(articleId)
                .stream()
                .map(CommentResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public CommentResponse updateComment(Long commentId, String content) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));
        comment.update(content);
        return CommentResponse.fromEntity(comment);
    }

    @Transactional
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
