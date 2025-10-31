package com.team5.gear.service;

import com.team5.gear.entity.Equipment;
import com.team5.gear.entity.Review;
import com.team5.gear.entity.User;
import com.team5.gear.repository.EquipmentRepository;
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
    private EquipmentRepository equipmentRepository;

    public Review createReview(Long equipmentId, String content, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Equipment equipment = equipmentRepository.findById(equipmentId)
                .orElseThrow(() -> new RuntimeException("Equipment not found"));

        Review review = new Review();
        review.setEquipment(equipment);
        review.setUser(user);
        review.setContent(content);

        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByEquipmentId(Long equipmentId) {
        return reviewRepository.findByEquipmentId(equipmentId);
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