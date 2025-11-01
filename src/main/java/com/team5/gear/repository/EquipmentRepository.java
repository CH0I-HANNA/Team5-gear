package com.team5.gear.repository;

import com.team5.gear.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

    @Query("SELECT e FROM Equipment e WHERE e.article.slug = :slug")
    List<Equipment> findByArticleSlug(@Param("slug") String slug);
}
