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

    @PostMapping
    public ResponseEntity<CommentResponse> createComment(
            @PathVariable("articleId") Long articleId,
            @RequestParam("userId") Long userId,
            @RequestBody CommentRequest commentRequest
    ) {
        return ResponseEntity.ok(commentService.createCommentSimple(articleId, userId, commentRequest.getContent()));
    }

    @GetMapping
    public ResponseEntity<List<CommentResponse>> getComments(@PathVariable Long articleId) {
        return ResponseEntity.ok(commentService.getComments(articleId));
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<CommentResponse> updateComment(
            @PathVariable("commentId") Long commentId,
            @RequestBody CommentRequest commentRequest
    ) {
        return ResponseEntity.ok(commentService.updateComment(commentId, commentRequest.getContent()));
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable("commentId") Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}
