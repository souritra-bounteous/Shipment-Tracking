package com.strack.shipmentservice.controller;

import com.strack.shipmentservice.dto.CreateShipmentRequest;
import com.strack.shipmentservice.dto.ShipmentResponse;
import com.strack.shipmentservice.dto.UpdateShipmentStatusRequest;
import com.strack.shipmentservice.service.ShipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shipments")
@RequiredArgsConstructor
public class ShipmentController {

    private final ShipmentService shipmentService;

    @PostMapping
    public ShipmentResponse createShipment(@RequestBody CreateShipmentRequest request) {
        return shipmentService.createShipment(request);
    }

    @GetMapping("/{trackingId}")
    public ShipmentResponse getShipment(@PathVariable String trackingId) {
        return shipmentService.getShipmentByTrackingId(trackingId);
    }

    @PutMapping("/{trackingId}/status")
    public ShipmentResponse updateStatus(
            @PathVariable String trackingId,
            @RequestBody UpdateShipmentStatusRequest request) {
        return shipmentService.updateShipmentStatus(trackingId, request);
    }
}