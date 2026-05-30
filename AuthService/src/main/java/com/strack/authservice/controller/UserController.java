package com.strack.authservice.controller;

import com.strack.authservice.dto.CreateDriverRequest;
import com.strack.authservice.dto.DriverProfileResponse;
import com.strack.authservice.dto.UpdateDriverRequest;
import com.strack.authservice.dto.UserResponse;
import com.strack.authservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/users/{id}")
    public UserResponse getUser(@PathVariable UUID id) {
        return userService.getUserById(id);
    }

    @GetMapping("/users")
    public List<UserResponse> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/drivers")
    public DriverProfileResponse createDriver(@RequestBody CreateDriverRequest request) {
        return userService.createDriver(request);
    }

    @GetMapping("/drivers")
    public List<DriverProfileResponse> getDrivers() {
        return userService.getAllDrivers();
    }

    @GetMapping("/drivers/{id}")
    public DriverProfileResponse getDriver(@PathVariable UUID id) {
        return userService.getDriverById(id);
    }

    @PutMapping("/drivers/{id}")
    public DriverProfileResponse updateDriver(@PathVariable UUID id, @RequestBody UpdateDriverRequest request) {
        return userService.updateDriver(id, request);
    }
}