package com.strack.shipmentservice.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CreateShipmentRequest {

    private String trackingId;
    private String customerId;
    private String receiverId;

    private String originAddressId;
    private String destinationAddressId;

    private String origin;
    private String destination;

    private Double weight;
    private String dimensions;
    private BigDecimal shippingCost;

    private LocalDate expectedDeliveryDate;
}