package com.strack.shipmentservice.repository;

import com.strack.shipmentservice.entity.DriverEarning;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DriverEarningRepository extends JpaRepository<DriverEarning, UUID> {

    List<DriverEarning> findByDriverId(UUID driverId);

    Optional<DriverEarning> findByShipmentId(UUID shipmentId);
}
