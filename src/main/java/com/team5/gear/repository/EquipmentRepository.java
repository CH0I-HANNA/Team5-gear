package com.team5.gear.repository;

import com.team5.gear.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

    Page<Equipment> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrCategory_NameContainingIgnoreCase(
            String name, String description, String category, Pageable pageable
    );

    List<Equipment> findTop5ByNameContainingIgnoreCase(String keyword);
}
