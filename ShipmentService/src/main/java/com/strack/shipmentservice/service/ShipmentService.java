package com.strack.shipmentservice.service;

import com.strack.shipmentservice.dto.AssignDriverRequest;
import com.strack.shipmentservice.dto.ComplaintRequest;
import com.strack.shipmentservice.dto.ComplaintResponse;
import com.strack.shipmentservice.dto.CreateShipmentRequest;
import com.strack.shipmentservice.dto.DashboardResponse;
import com.strack.shipmentservice.dto.DriverEarningResponse;
import com.strack.shipmentservice.dto.PaymentRequest;
import com.strack.shipmentservice.dto.PaymentResponse;
import com.strack.shipmentservice.dto.ShipmentResponse;
import com.strack.shipmentservice.dto.UpdateComplaintRequest;
import com.strack.shipmentservice.dto.UpdateShipmentStatusRequest;

import java.util.List;
import java.util.UUID;

public interface ShipmentService {

    ShipmentResponse createShipment(CreateShipmentRequest request);

    ShipmentResponse getShipmentByTrackingId(String trackingId);

    List<ShipmentResponse> getShipmentsByCustomer(UUID customerId);

    List<ShipmentResponse> getShipmentsByDriver(UUID driverId);

    List<ShipmentResponse> getAllShipments();

    ShipmentResponse assignDriver(UUID shipmentId, AssignDriverRequest request);

    ShipmentResponse updateShipmentStatus(UUID shipmentId, UpdateShipmentStatusRequest request);

    DashboardResponse getDashboardStats();

    PaymentResponse createPayment(PaymentRequest request);

    List<PaymentResponse> getPaymentsByShipment(UUID shipmentId);

    List<DriverEarningResponse> getDriverEarnings(UUID driverId);

    ComplaintResponse createComplaint(ComplaintRequest request);

    List<ComplaintResponse> getAllComplaints();

    ComplaintResponse updateComplaint(UUID id, UpdateComplaintRequest request);
}