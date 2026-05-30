package com.strack.authservice.service;


import com.strack.authservice.dto.AuthResponse;
import com.strack.authservice.dto.LoginRequest;
import com.strack.authservice.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    AuthResponse refreshToken(String refreshToken);
}