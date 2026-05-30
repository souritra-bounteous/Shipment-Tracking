package com.strack.shipmentservice.repository;

import com.strack.shipmentservice.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ComplaintRepository extends JpaRepository<Complaint, UUID> {
}
