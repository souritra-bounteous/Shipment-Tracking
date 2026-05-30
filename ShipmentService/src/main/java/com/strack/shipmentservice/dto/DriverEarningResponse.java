package com.strack.shipmentservice.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class DriverEarningResponse {
    private UUID id;
    private UUID shipmentId;
    private UUID driverId;
    private BigDecimal amount;
    private String status;
    private LocalDateTime createdAt;
}
