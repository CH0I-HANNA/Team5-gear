package com.team5.gear.service;

import com.team5.gear.entity.Equipment;
import com.team5.gear.repository.EquipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EquipmentService {

    private final EquipmentRepository equipmentRepository;

    public List<Equipment> getEquipmentsByArticleSlug(String slug) {
        return equipmentRepository.findByArticleSlug(slug);
    }

    public List<Equipment> getAllProducts() {
        return equipmentRepository.findAll();
    }

    public Equipment getProductById(Long equipmentId) {
        return equipmentRepository.findById(equipmentId).orElse(null);
    }

    public Equipment createProduct(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }
}
