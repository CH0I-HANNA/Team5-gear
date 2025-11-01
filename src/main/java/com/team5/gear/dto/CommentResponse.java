package com.team5.gear.dto;

import lombok.Builder;
import lombok.Getter;
import java.sql.Timestamp;

@Getter
@Builder
public class CommentResponse {
    private Long id;
    private String content;
    private String username;
    private String email;
    private Timestamp createdAt;
}
