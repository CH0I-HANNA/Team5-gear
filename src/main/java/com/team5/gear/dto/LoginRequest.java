package com.team5.gear.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
