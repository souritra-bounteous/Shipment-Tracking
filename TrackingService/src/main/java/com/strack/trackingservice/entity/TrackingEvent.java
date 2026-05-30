package com.strack.trackingservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tracking_events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrackingEvent {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private UUID shipmentId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ShipmentStatus status;

    private String location;

    private Double latitude;
    private Double longitude;

    private String remarks;

    private UUID updatedBy;

    @Builder.Default
    @Column(name = "event_time", nullable = false)
    private LocalDateTime eventTime = LocalDateTime.now();

    @Builder.Default
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}