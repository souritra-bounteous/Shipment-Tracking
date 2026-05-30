package com.strack.authservice.dto;

import lombok.Data;

@Data
public class CreateDriverRequest {
    private String name;
    private String email;
    private String phone;
    private String password;
    private String licenseNumber;
    private String vehicleNumber;
    private String vehicleType;
}
