검색 기능 백엔드 구현 가이드 (Spring Boot + Next.js 연동)
1️⃣ 목적

사용자가 검색어를 입력하면 백엔드에서 장비(equipment) 데이터베이스를 조회하여 결과를 반환한다.

검색 API 엔드포인트: /api/search?query={검색어}

2️⃣ 주요 구성
(1) Controller
package com.team5.gear.controller;

import com.team5.gear.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class SearchController {

    private final SearchService searchService;

    // 검색 결과 조회
    @GetMapping
    public ResponseEntity<Map<String, Object>> search(
            @RequestParam("query") String query,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

        Map<String, Object> results = searchService.searchEquipments(query, page, size);
        return ResponseEntity.ok(results);
    }
}


중요 포인트:

@RequestParam("query")처럼 명시적으로 이름을 지정해야 “IllegalArgumentException” 오류를 방지할 수 있음.

@CrossOrigin을 통해 프론트엔드(localhost:3000)에서 접근 가능하게 설정.

(2) Service
package com.team5.gear.service;

import com.team5.gear.entity.Equipment;
import com.team5.gear.repository.EquipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final EquipmentRepository equipmentRepository;

    public Map<String, Object> searchEquipments(String query, int page, int size) {
        List<Equipment> results = equipmentRepository.findByNameContainingIgnoreCase(query);

        Map<String, Object> response = new HashMap<>();
        response.put("results", results.stream().map(this::convertToDTO).collect(Collectors.toList()));
        response.put("totalCount", results.size());

        return response;
    }

    private Map<String, Object> convertToDTO(Equipment equipment) {
        Map<String, Object> dto = new HashMap<>();
        dto.put("equipmentId", equipment.getEquipmentId());
        dto.put("name", equipment.getName());
        dto.put("description", equipment.getDescription());
        dto.put("category", equipment.getCategory().getName());
        dto.put("imageUrl", equipment.getImageUrl());
        return dto;
    }
}

(3) Repository
package com.team5.gear.repository;

import com.team5.gear.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EquipmentRepository extends JpaRepository<Equipment, Integer> {
List<Equipment> findByNameContainingIgnoreCase(String name);
}

3️⃣ 예시 응답(JSON)
{
"results": [
{
"equipmentId": 1,
"name": "텐트",
"description": "가벼운 캠핑용 텐트",
"category": "캠핑",
"imageUrl": "https://example.com/tent.jpg"
}
],
"totalCount": 1
}

4️⃣ 프론트엔드 연결 흐름
(1) SearchBox.tsx (현재 완성본)

입력된 값을 부모 컴포넌트로 전달 (onSubmit(trimmed))

(2) SearchResultsPage.tsx

/api/search?query=검색어로 요청

백엔드의 SearchController에서 결과 JSON을 반환받음

5️⃣ 에러 대응
오류 메시지	원인	해결 방법
IllegalArgumentException: Name for argument ... not specified	@RequestParam 이름 누락	"query" 명시
500 (Internal Server Error)	DB 연결 또는 NullPointerException	Service에서 null 체크
404 (Not Found)	API 엔드포인트 불일치	프론트의 fetch URL(/api/search) 확인
CORS policy	프론트와 백엔드 도메인 다름	@CrossOrigin(origins = "http://localhost:3000") 추가
6️⃣ 빌드 설정 주의사항

build.gradle에 다음 옵션 포함해야 @RequestParam 인식 오류 방지 가능:

tasks.withType(JavaCompile) {
options.compilerArgs += ["-parameters"]
}