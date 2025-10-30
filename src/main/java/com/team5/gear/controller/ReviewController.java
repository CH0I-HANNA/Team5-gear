package com.team5.gear.controller;

import com.team5.gear.dto.ReviewRequest;
import com.team5.gear.entity.Review;
import com.team5.gear.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/journals/{journalId}/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<Review> createReview(@PathVariable Long journalId,
                                               @RequestBody ReviewRequest reviewRequest,
                                               Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }
        String userEmail = principal.getName();
        Review createdReview = reviewService.createReview(journalId, reviewRequest.getContent(), userEmail);
        return ResponseEntity.ok(createdReview);
    }

    @GetMapping
    public ResponseEntity<List<Review>> getReviewsForJournal(@PathVariable Long journalId) {
        List<Review> reviews = reviewService.getReviewsByJournalId(journalId);
        return ResponseEntity.ok(reviews);
    }
}
