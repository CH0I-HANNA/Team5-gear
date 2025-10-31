package com.team5.gear.service;

import com.team5.gear.dto.EquipmentResponse;
import com.team5.gear.entity.Equipment;
import com.team5.gear.repository.EquipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final EquipmentRepository equipmentRepository;

    public Map<String, Object> searchEquipments(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Equipment> resultPage = equipmentRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrCategory_NameContainingIgnoreCase(
                query, query, query, pageable
        );

        List<EquipmentResponse> content = resultPage.getContent()
                .stream().map(EquipmentResponse::fromEntity).toList();

        Map<String, Object> response = new HashMap<>();
        response.put("query", query);
        response.put("page", resultPage.getNumber());
        response.put("totalPages", resultPage.getTotalPages());
        response.put("totalElements", resultPage.getTotalElements());
        response.put("results", content);

        return response;
    }

    public List<String> getSuggestions(String keyword) {
        List<Equipment> equipments = equipmentRepository.findTop5ByNameContainingIgnoreCase(keyword);
        return equipments.stream().map(Equipment::getName).toList();
    }
}
