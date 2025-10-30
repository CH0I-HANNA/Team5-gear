package com.team5.gear.repository;

import com.team5.gear.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByJournalId(Long journalId);
    List<Review> findByUserEmail(String email);
}
