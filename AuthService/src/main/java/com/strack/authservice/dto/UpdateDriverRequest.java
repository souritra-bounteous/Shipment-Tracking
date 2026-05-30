package com.strack.authservice.dto;

import lombok.Data;

@Data
public class UpdateDriverRequest {
    private String phone;
    private String licenseNumber;
    private String vehicleNumber;
    private String vehicleType;
    private Double currentLatitude;
    private Double currentLongitude;
    private Boolean available;
}
