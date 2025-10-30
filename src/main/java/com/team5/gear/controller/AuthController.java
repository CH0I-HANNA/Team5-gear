package com.team5.gear.controller;

import com.team5.gear.dto.ApiResponse;
import com.team5.gear.dto.JwtAuthenticationResponse;
import com.team5.gear.dto.LoginRequest;
import com.team5.gear.dto.SignUpRequest;
import com.team5.gear.entity.User;
import com.team5.gear.security.JwtTokenProvider;
import com.team5.gear.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(loginRequest.getEmail());
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());

        try {
            authService.registerUser(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage()));
        }

        return ResponseEntity.ok(new ApiResponse("회원가입이 완료되었습니다."));
    }
}
