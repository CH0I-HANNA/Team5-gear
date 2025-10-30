package com.team5.gear.service;

import com.team5.gear.entity.Journal;
import com.team5.gear.entity.Review;
import com.team5.gear.entity.User;
import com.team5.gear.repository.JournalRepository;
import com.team5.gear.repository.ReviewRepository;
import com.team5.gear.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JournalRepository journalRepository;

    public Review createReview(Long journalId, String content, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Journal journal = journalRepository.findById(journalId)
                .orElseThrow(() -> new RuntimeException("Journal not found"));

        Review review = new Review();
        review.setJournal(journal);
        review.setUser(user);
        review.setContent(content);

        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByJournalId(Long journalId) {
        return reviewRepository.findByJournalId(journalId);
    }

    public List<Review> getReviewsByUserEmail(String email) {
        return reviewRepository.findByUserEmail(email);
    }

    public Review updateReview(Long reviewId, String content, String userEmail) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        if (!review.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("You are not authorized to update this review");
        }

        review.setContent(content);
        return reviewRepository.save(review);
    }

    public void deleteReview(Long reviewId, String userEmail) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        if (!review.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("You are not authorized to delete this review");
        }

        reviewRepository.delete(review);
    }
}
