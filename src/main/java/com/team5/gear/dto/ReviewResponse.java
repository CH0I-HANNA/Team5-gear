package com.team5.gear.dto;

import com.team5.gear.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponse {
    private Long id;
    private String title; // From Review entity
    private String content;
    private Integer rating; // From Review entity
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private EquipmentForReviewResponse equipment; // Nested DTO for equipment
    private UserResponse user; // Nested DTO for user

    public static ReviewResponse fromEntity(Review review) {
        ReviewResponse response = new ReviewResponse();
        response.setId(review.getId());
        response.setTitle(review.getTitle());
        response.setContent(review.getContent());
        response.setRating(review.getRating());
        response.setCreatedAt(review.getCreatedAt());
        response.setUpdatedAt(review.getUpdatedAt());
        response.setEquipment(EquipmentForReviewResponse.fromEntity(review.getEquipment()));
        response.setUser(UserResponse.fromEntity(review.getUser()));
        return response;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EquipmentForReviewResponse {
        private Long id;
        private String name;

        public static EquipmentForReviewResponse fromEntity(com.team5.gear.entity.Equipment equipment) {
            EquipmentForReviewResponse response = new EquipmentForReviewResponse();
            response.setId(equipment.getId());
            response.setName(equipment.getName());
            return response;
        }
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserResponse {
        private Long id;
        private String username;

        public static UserResponse fromEntity(com.team5.gear.entity.User user) {
            UserResponse response = new UserResponse();
            response.setId(user.getId());
            response.setUsername(user.getUsername());
            return response;
        }
    }
}
