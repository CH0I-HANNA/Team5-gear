package com.team5.gear.controller;

import com.team5.gear.entity.Comment;
import com.team5.gear.service.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/articles/{articleId}/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    private final CommentService commentService;
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public List<Comment> getComments(@PathVariable Long articleId) {
        return commentService.getComments(articleId);
    }

    @PostMapping
    public Comment addComment(
            @PathVariable("articleId") Long articleId,
            @RequestParam("userId") Long userId,
            @RequestParam("content") String content
    ) {
        return commentService.addComment(articleId, userId, content);
    }
}
