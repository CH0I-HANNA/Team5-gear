package com.team5.gear.controller;

import com.team5.gear.dto.CommentRequest;
import com.team5.gear.dto.CommentResponse;
import com.team5.gear.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/articles/{articleId}/comments")
public class CommentController {

    private final CommentService commentService;

    // 댓글 등록 (userId를 쿼리 파라미터로 받음)
    @PostMapping
    public ResponseEntity<CommentResponse> createComment(
            @PathVariable("articleId") Long articleId,
            @RequestParam("userId") Long userId,
            @RequestParam("content") String content
    ) {
        return ResponseEntity.ok(commentService.createCommentSimple(articleId, userId, content));
    }

    // 댓글 목록 조회
    @GetMapping
    public ResponseEntity<List<CommentResponse>> getComments(@PathVariable Long articleId) {
        return ResponseEntity.ok(commentService.getComments(articleId));
    }
}
