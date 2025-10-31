package com.team5.gear.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import com.team5.gear.entity.Equipment;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EquipmentResponse {
    private Long equipmentId;
    private String name;
    private String description;
    private String category;
    private String imageUrl;

    public static EquipmentResponse fromEntity(Equipment equipment) {
        return EquipmentResponse.builder()
                .equipmentId(equipment.getId())
                .name(equipment.getName())
                .description(equipment.getDescription())
                .category(equipment.getCategory() != null ? equipment.getCategory().getName() : null)
                .imageUrl(equipment.getImageUrl())
                .build();
    }
}
