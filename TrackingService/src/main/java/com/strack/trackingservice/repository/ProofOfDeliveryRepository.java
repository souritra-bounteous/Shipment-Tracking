package com.strack.trackingservice.repository;

import com.strack.trackingservice.entity.ProofOfDelivery;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ProofOfDeliveryRepository extends JpaRepository<ProofOfDelivery, UUID> {

    Optional<ProofOfDelivery> findByShipmentId(UUID shipmentId);
}
