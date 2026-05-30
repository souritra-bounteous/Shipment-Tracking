package com.strack.shipmentservice.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PaymentRequest {
    private String shipmentId;
    private String customerId;
    private BigDecimal amount;
    private String paymentMethod;
    private String transactionReference;
}
