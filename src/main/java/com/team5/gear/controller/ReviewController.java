package com.team5.gear.controller;

import com.team5.gear.entity.Review;
import com.team5.gear.entity.User;
import com.team5.gear.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipment/{equipmentId}/reviews")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    private final ReviewService reviewService;

    // Get reviews for a specific equipment
    @GetMapping
    public ResponseEntity<List<Review>> getReviewsForEquipment(@PathVariable Long equipmentId) {
        List<Review> reviews = reviewService.getReviewsByEquipmentId(equipmentId);
        return ResponseEntity.ok(reviews);
    }

    // Submit a review for a specific equipment
    @PostMapping
    public ResponseEntity<Review> submitReviewForEquipment(
            @PathVariable Long equipmentId,
            @RequestBody Review review,
            @AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Review savedReview = reviewService.createReview(equipmentId, review.getContent(), currentUser.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedReview);
    }

    // Update a review
    @PutMapping("/{reviewId}")
    public ResponseEntity<Review> updateReview(
            @PathVariable Long equipmentId, // equipmentId is not strictly needed for update, but good for context
            @PathVariable Long reviewId,
            @RequestBody Review review,
            @AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            Review updatedReview = reviewService.updateReview(reviewId, review.getContent(), currentUser.getEmail());
            return ResponseEntity.ok(updatedReview);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Not authorized or review not found
        }
    }

    // Delete a review
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(
            @PathVariable Long equipmentId, // equipmentId is not strictly needed for delete, but good for context
            @PathVariable Long reviewId,
            @AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            reviewService.deleteReview(reviewId, currentUser.getEmail());
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Not authorized or review not found
        }
    }
}