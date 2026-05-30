package com.strack.shipmentservice.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class ComplaintResponse {
    private UUID id;
    private UUID shipmentId;
    private UUID customerId;
    private String subject;
    private String description;
    private String status;
    private String resolution;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
