package com.strack.trackingservice.repository;

import com.strack.trackingservice.entity.ShipmentCurrentLocation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ShipmentCurrentLocationRepository extends JpaRepository<ShipmentCurrentLocation, UUID> {
}