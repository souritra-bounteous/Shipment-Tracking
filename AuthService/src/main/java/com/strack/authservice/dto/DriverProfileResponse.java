package com.strack.authservice.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class DriverProfileResponse {
    private UUID id;
    private UUID userId;
    private String name;
    private String email;
    private String phone;
    private String licenseNumber;
    private String vehicleNumber;
    private String vehicleType;
    private Double currentLatitude;
    private Double currentLongitude;
    private Boolean available;
    private LocalDateTime createdAt;
}
