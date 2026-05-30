package com.strack.shipmentservice.entity;

import jakarta.persistence.*;
import lombok.*;

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

    private UUID senderId;
    private UUID receiverId;

    private UUID originAddressId;
    private UUID destinationAddressId;

    @Enumerated(EnumType.STRING)
    private ShipmentStatus status;

    private Double weight;
    private String dimensions;

    private UUID assignedAgentId;

    private LocalDate expectedDeliveryDate;
    private LocalDate actualDeliveryDate;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
}