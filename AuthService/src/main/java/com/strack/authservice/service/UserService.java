package com.strack.authservice.service;

import com.strack.authservice.dto.UserResponse;

import java.util.UUID;

public interface UserService {

    UserResponse getUserById(UUID id);
}