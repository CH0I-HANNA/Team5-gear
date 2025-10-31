package com.team5.gear.controller;

import com.team5.gear.entity.Equipment;
import com.team5.gear.repository.EquipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@RestController
@RequestMapping("/api/equipment")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class EquipmentController {

    private final EquipmentRepository equipmentRepository;

    @PostMapping("/auto-insert")
    public ResponseEntity<String> autoInsert(@RequestParam String productUrl) {
        try {
            String pythonApiUrl = "http://localhost:8000/crawl?url=" +
                    URLEncoder.encode(productUrl, StandardCharsets.UTF_8);
            RestTemplate restTemplate = new RestTemplate();
            Map<String, Object> data = restTemplate.getForObject(pythonApiUrl, Map.class);

            if (data != null) {
                Equipment equipment = new Equipment();
                equipment.setName((String) data.get("name"));
                equipment.setPrice(parsePrice((String) data.get("price")));
                equipment.setImageUrl((String) data.get("image_url"));
                equipment.setPurchaseUrl(productUrl);
                equipmentRepository.save(equipment);
                return ResponseEntity.ok("장비 데이터가 DB에 성공적으로 저장되었습니다.");
            } else {
                return ResponseEntity.badRequest().body("데이터를 가져오지 못했습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("오류 발생: " + e.getMessage());
        }
    }

    private int parsePrice(String priceString) {
        if (priceString == null) return 0;
        return Integer.parseInt(priceString.replaceAll("[^0-9]", ""));
    }
}
