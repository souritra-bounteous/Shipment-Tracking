package com.strack.shipmentservice.dto;

import lombok.Data;

@Data
public class ComplaintRequest {
    private String shipmentId;
    private String customerId;
    private String subject;
    private String description;
}
