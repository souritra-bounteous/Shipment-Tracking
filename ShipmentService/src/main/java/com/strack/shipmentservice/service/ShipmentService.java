package com.strack.shipmentservice.service;



import com.strack.shipmentservice.dto.CreateShipmentRequest;
import com.strack.shipmentservice.dto.ShipmentResponse;
import com.strack.shipmentservice.dto.UpdateShipmentStatusRequest;

import java.util.UUID;

public interface ShipmentService {

    ShipmentResponse createShipment(CreateShipmentRequest request);

    ShipmentResponse getShipmentByTrackingId(String trackingId);

    ShipmentResponse updateShipmentStatus(String trackingId, UpdateShipmentStatusRequest request);
}