package com.team5.gear.controller;

import com.team5.gear.dto.ReviewRequest;
import com.team5.gear.dto.ReviewResponse; // ADD
import com.team5.gear.entity.Review;
import com.team5.gear.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors; // ADD

@RestController
@RequestMapping("/api/reviews")
public class UserReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/me")
    public ResponseEntity<List<ReviewResponse>> getMyReviews(Principal principal) { // CHANGE
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }
        String userEmail = principal.getName();
        List<Review> reviews = reviewService.getReviewsByUserEmail(userEmail);
        List<ReviewResponse> reviewResponses = reviews.stream() // ADD
                .map(ReviewResponse::fromEntity) // ADD
                .collect(Collectors.toList()); // ADD
        return ResponseEntity.ok(reviewResponses); // CHANGE
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewResponse> updateReview(@PathVariable Long reviewId, // CHANGE
                                               @RequestBody ReviewRequest reviewRequest,
                                               Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }
        String userEmail = principal.getName();
        try {
            Review updatedReview = reviewService.updateReview(reviewId, reviewRequest.getContent(), userEmail);
            return ResponseEntity.ok(ReviewResponse.fromEntity(updatedReview)); // CHANGE
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).build(); // Forbidden
        }
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId,
                                             Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }
        String userEmail = principal.getName();
        try {
            reviewService.deleteReview(reviewId, userEmail);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).build(); // Forbidden
        }
    }
}
