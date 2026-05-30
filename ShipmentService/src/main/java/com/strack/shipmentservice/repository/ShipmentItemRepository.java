package com.strack.shipmentservice.repository;

import com.strack.shipmentservice.entity.ShipmentItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ShipmentItemRepository extends JpaRepository<ShipmentItem, UUID> {
}