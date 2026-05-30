package com.strack.shipmentservice.repository;

import com.strack.shipmentservice.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PaymentRepository extends JpaRepository<Payment, UUID> {

    List<Payment> findByShipmentId(UUID shipmentId);
}
