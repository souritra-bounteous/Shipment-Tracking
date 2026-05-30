package com.strack.shipmentservice.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateShipmentRequest {

    private String trackingId;
    private String senderId;
    private String receiverId;

    private String originAddressId;
    private String destinationAddressId;

    private Double weight;
    private String dimensions;

    private LocalDate expectedDeliveryDate;
}