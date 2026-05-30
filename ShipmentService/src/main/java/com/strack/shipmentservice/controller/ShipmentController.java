package com.strack.shipmentservice.controller;

import com.strack.shipmentservice.dto.*;
import com.strack.shipmentservice.service.ShipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/shipments")
@RequiredArgsConstructor
public class ShipmentController {

    private final ShipmentService shipmentService;

    @PostMapping
    public ShipmentResponse createShipment(@RequestBody CreateShipmentRequest request) {
        return shipmentService.createShipment(request);
    }

    @GetMapping("/customer/{customerId}")
    public List<ShipmentResponse> getCustomerShipments(@PathVariable UUID customerId) {
        return shipmentService.getShipmentsByCustomer(customerId);
    }

    @GetMapping("/{trackingId}")
    public ShipmentResponse getShipment(@PathVariable String trackingId) {
        return shipmentService.getShipmentByTrackingId(trackingId);
    }

    @GetMapping("/driver/{driverId}")
    public List<ShipmentResponse> getDriverShipments(@PathVariable UUID driverId) {
        return shipmentService.getShipmentsByDriver(driverId);
    }

    @PutMapping("/{shipmentId}/status")
    public ShipmentResponse updateStatus(
            @PathVariable UUID shipmentId,
            @RequestBody UpdateShipmentStatusRequest request) {
        return shipmentService.updateShipmentStatus(shipmentId, request);
    }

    @GetMapping
    public List<ShipmentResponse> getAllShipments() {
        return shipmentService.getAllShipments();
    }

    @PutMapping("/{shipmentId}/assign")
    public ShipmentResponse assignDriver(
            @PathVariable UUID shipmentId,
            @RequestBody AssignDriverRequest request) {
        return shipmentService.assignDriver(shipmentId, request);
    }

    @GetMapping("/admin/dashboard")
    public DashboardResponse getDashboardStats() {
        return shipmentService.getDashboardStats();
    }

    @PostMapping("/payments")
    public PaymentResponse createPayment(@RequestBody PaymentRequest request) {
        return shipmentService.createPayment(request);
    }

    @GetMapping("/payments/{shipmentId}")
    public List<PaymentResponse> getPaymentsByShipment(@PathVariable UUID shipmentId) {
        return shipmentService.getPaymentsByShipment(shipmentId);
    }

    @GetMapping("/earnings/{driverId}")
    public List<DriverEarningResponse> getDriverEarnings(@PathVariable UUID driverId) {
        return shipmentService.getDriverEarnings(driverId);
    }

    @PostMapping("/complaints")
    public ComplaintResponse createComplaint(@RequestBody ComplaintRequest request) {
        return shipmentService.createComplaint(request);
    }

    @GetMapping("/complaints")
    public List<ComplaintResponse> getComplaints() {
        return shipmentService.getAllComplaints();
    }

    @PutMapping("/complaints/{id}")
    public ComplaintResponse updateComplaint(
            @PathVariable UUID id,
            @RequestBody UpdateComplaintRequest request) {
        return shipmentService.updateComplaint(id, request);
    }
}