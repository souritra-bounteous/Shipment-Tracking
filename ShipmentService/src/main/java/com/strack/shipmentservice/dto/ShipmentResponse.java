package com.strack.shipmentservice.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
public class ShipmentResponse {

    private UUID id;
    private String trackingId;
    private String status;

    private UUID senderId;
    private UUID receiverId;

    private LocalDate expectedDeliveryDate;
    private LocalDate actualDeliveryDate;
}