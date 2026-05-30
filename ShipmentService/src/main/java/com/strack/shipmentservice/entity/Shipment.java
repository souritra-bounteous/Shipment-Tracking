package com.strack.shipmentservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "shipments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shipment {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(unique = true, nullable = false)
    private String trackingId;

    @Column(nullable = false)
    private UUID customerId;

    private UUID receiverId;

    private UUID originAddressId;
    private UUID destinationAddressId;

    private String origin;
    private String destination;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ShipmentStatus status;

    private Double weight;
    private String dimensions;

    private UUID assignedDriverId;

    private BigDecimal shippingCost;

    private LocalDate expectedDeliveryDate;
    private LocalDate actualDeliveryDate;

    @Builder.Default
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}