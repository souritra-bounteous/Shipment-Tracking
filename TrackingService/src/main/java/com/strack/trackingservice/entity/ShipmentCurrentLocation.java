package com.strack.trackingservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "shipment_current_location")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShipmentCurrentLocation {

    @Id
    private UUID shipmentId;

    private Double latitude;
    private Double longitude;

    private LocalDateTime lastUpdated = LocalDateTime.now();
}