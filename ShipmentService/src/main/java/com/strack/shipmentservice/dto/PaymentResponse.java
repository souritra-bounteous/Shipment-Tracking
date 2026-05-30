package com.strack.shipmentservice.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class PaymentResponse {
    private UUID id;
    private UUID shipmentId;
    private UUID customerId;
    private BigDecimal amount;
    private String status;
    private String paymentMethod;
    private String transactionReference;
    private LocalDateTime paidAt;
    private LocalDateTime createdAt;
}
