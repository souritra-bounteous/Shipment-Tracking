package com.strack.shipmentservice.repository;

import com.strack.shipmentservice.entity.Shipment;
import com.strack.shipmentservice.entity.ShipmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ShipmentRepository extends JpaRepository<Shipment, UUID> {

    Optional<Shipment> findByTrackingId(String trackingId);

    List<Shipment> findByCustomerId(UUID customerId);

    List<Shipment> findByAssignedDriverId(UUID assignedDriverId);

    long countByStatus(ShipmentStatus status);
}