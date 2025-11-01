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
}
