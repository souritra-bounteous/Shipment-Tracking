package com.strack.authservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "driver_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverProfile {

    @Id
    @GeneratedValue
    private UUID id;

    @OneToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "license_number", nullable = false, unique = true)
    private String licenseNumber;

    @Column(name = "vehicle_number", nullable = false)
    private String vehicleNumber;

    @Column(name = "vehicle_type")
    private String vehicleType;

    @Column(name = "current_latitude")
    private Double currentLatitude;

    @Column(name = "current_longitude")
    private Double currentLongitude;

    @Builder.Default
    @Column(name = "is_available", nullable = false)
    private Boolean available = true;

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
