package com.strack.shipmentservice.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class ShipmentResponse {

    private UUID id;
    private String trackingId;
    private String status;

    private UUID customerId;
    private UUID receiverId;
    private UUID assignedDriverId;

    private String origin;
    private String destination;
    private Double weight;
    private String dimensions;
    private BigDecimal shippingCost;

    private LocalDate expectedDeliveryDate;
    private LocalDate actualDeliveryDate;
    private LocalDateTime createdAt;
}