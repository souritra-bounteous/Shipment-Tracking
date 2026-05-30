package com.strack.shipmentservice.dto;

import lombok.Data;

@Data
public class UpdateComplaintRequest {
    private String status;
    private String resolution;
}
