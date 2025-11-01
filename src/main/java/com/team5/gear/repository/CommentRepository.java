package com.team5.gear.repository;

import com.team5.gear.entity.Comment;
import com.team5.gear.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    // 특정 게시글에 달린 댓글을 생성일 기준으로 최신순 정렬해서 조회
    List<Comment> findByArticleOrderByCreatedAtDesc(Article article);
}
