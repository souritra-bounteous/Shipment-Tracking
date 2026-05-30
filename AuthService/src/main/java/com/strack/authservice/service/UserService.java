package com.strack.authservice.service;

import com.strack.authservice.dto.CreateDriverRequest;
import com.strack.authservice.dto.DriverProfileResponse;
import com.strack.authservice.dto.UpdateDriverRequest;
import com.strack.authservice.dto.UserResponse;

import java.util.List;
import java.util.UUID;

public interface UserService {

    UserResponse getUserById(UUID id);

    List<UserResponse> getAllUsers();

    DriverProfileResponse createDriver(CreateDriverRequest request);

    List<DriverProfileResponse> getAllDrivers();

    DriverProfileResponse getDriverById(UUID id);

    DriverProfileResponse updateDriver(UUID id, UpdateDriverRequest request);
}