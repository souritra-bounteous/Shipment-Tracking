package com.strack.shipmentservice.serviceimpl;

import com.strack.shipmentservice.dto.*;
import com.strack.shipmentservice.entity.*;
import com.strack.shipmentservice.exception.ResourceNotFoundException;
import com.strack.shipmentservice.repository.ComplaintRepository;
import com.strack.shipmentservice.repository.DriverEarningRepository;
import com.strack.shipmentservice.repository.PaymentRepository;
import com.strack.shipmentservice.repository.ShipmentRepository;
import com.strack.shipmentservice.service.ShipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class ShipmentServiceImpl implements ShipmentService {

    private final ShipmentRepository shipmentRepository;
    private final PaymentRepository paymentRepository;
    private final DriverEarningRepository driverEarningRepository;
    private final ComplaintRepository complaintRepository;

    @Override
    public ShipmentResponse createShipment(CreateShipmentRequest request) {

        Shipment shipment = Shipment.builder()
                .trackingId(resolveTrackingId(request.getTrackingId()))
                .customerId(parseRequiredUuid(request.getCustomerId(), "customerId"))
                .receiverId(parseOptionalUuid(request.getReceiverId()))
                .originAddressId(parseOptionalUuid(request.getOriginAddressId()))
                .destinationAddressId(parseOptionalUuid(request.getDestinationAddressId()))
                .origin(request.getOrigin())
                .destination(request.getDestination())
                .weight(request.getWeight())
                .dimensions(request.getDimensions())
                .shippingCost(resolveAmount(request.getShippingCost()))
                .expectedDeliveryDate(request.getExpectedDeliveryDate())
                .status(ShipmentStatus.BOOKED)
                .build();

        shipmentRepository.save(shipment);

        return mapToResponse(shipment);
    }

    @Override
    public ShipmentResponse getShipmentByTrackingId(String trackingId) {

        Shipment shipment = shipmentRepository.findByTrackingId(trackingId)
                .orElseThrow(() -> new ResourceNotFoundException("Shipment not found"));

        return mapToResponse(shipment);
    }

    @Override
    public List<ShipmentResponse> getShipmentsByCustomer(UUID customerId) {
        return shipmentRepository.findByCustomerId(customerId).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<ShipmentResponse> getShipmentsByDriver(UUID driverId) {
        return shipmentRepository.findByAssignedDriverId(driverId).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<ShipmentResponse> getAllShipments() {
        return shipmentRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public ShipmentResponse assignDriver(UUID shipmentId, AssignDriverRequest request) {
        Shipment shipment = getShipment(shipmentId);
        UUID driverId = parseRequiredUuid(request.getDriverId(), "driverId");

        shipment.setAssignedDriverId(driverId);
        shipment.setStatus(ShipmentStatus.ASSIGNED);
        Shipment savedShipment = shipmentRepository.save(shipment);

        upsertDriverEarning(savedShipment, driverId);
        return mapToResponse(savedShipment);
    }

    @Override
    public ShipmentResponse updateShipmentStatus(UUID shipmentId, UpdateShipmentStatusRequest request) {

        Shipment shipment = getShipment(shipmentId);
        ShipmentStatus status = ShipmentStatus.valueOf(request.getStatus().toUpperCase());

        shipment.setStatus(status);

        if (ShipmentStatus.DELIVERED == status) {
            shipment.setActualDeliveryDate(java.time.LocalDate.now());
        }

        Shipment savedShipment = shipmentRepository.save(shipment);

        if (savedShipment.getAssignedDriverId() != null) {
            upsertDriverEarning(savedShipment, savedShipment.getAssignedDriverId());
        }

        return mapToResponse(savedShipment);
    }

    @Override
    public DashboardResponse getDashboardStats() {
        Map<String, Long> byStatus = Stream.of(ShipmentStatus.values())
                .collect(Collectors.toMap(Enum::name, shipmentRepository::countByStatus));

        BigDecimal totalRevenue = paymentRepository.findAll().stream()
                .filter(payment -> PaymentStatus.PAID == payment.getStatus())
                .map(Payment::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return DashboardResponse.builder()
                .totalShipments(shipmentRepository.count())
                .assignedShipments(byStatus.get(ShipmentStatus.ASSIGNED.name()))
                .deliveredShipments(byStatus.get(ShipmentStatus.DELIVERED.name()))
                .cancelledShipments(byStatus.get(ShipmentStatus.CANCELLED.name()))
                .totalRevenue(totalRevenue)
                .shipmentsByStatus(byStatus)
                .build();
    }

    @Override
    public PaymentResponse createPayment(PaymentRequest request) {
        Shipment shipment = getShipment(parseRequiredUuid(request.getShipmentId(), "shipmentId"));

        Payment payment = Payment.builder()
                .shipment(shipment)
                .customerId(parseRequiredUuid(request.getCustomerId(), "customerId"))
                .amount(resolveAmount(request.getAmount()))
                .status(PaymentStatus.PAID)
                .paymentMethod(request.getPaymentMethod())
                .transactionReference(request.getTransactionReference())
                .paidAt(LocalDateTime.now())
                .build();

        return mapToPaymentResponse(paymentRepository.save(payment));
    }

    @Override
    public List<PaymentResponse> getPaymentsByShipment(UUID shipmentId) {
        return paymentRepository.findByShipmentId(shipmentId).stream()
                .map(this::mapToPaymentResponse)
                .toList();
    }

    @Override
    public List<DriverEarningResponse> getDriverEarnings(UUID driverId) {
        return driverEarningRepository.findByDriverId(driverId).stream()
                .map(this::mapToDriverEarningResponse)
                .toList();
    }

    @Override
    public ComplaintResponse createComplaint(ComplaintRequest request) {
        Shipment shipment = getShipment(parseRequiredUuid(request.getShipmentId(), "shipmentId"));

        Complaint complaint = Complaint.builder()
                .shipment(shipment)
                .customerId(parseRequiredUuid(request.getCustomerId(), "customerId"))
                .subject(request.getSubject())
                .description(request.getDescription())
                .status(ComplaintStatus.OPEN)
                .build();

        return mapToComplaintResponse(complaintRepository.save(complaint));
    }

    @Override
    public List<ComplaintResponse> getAllComplaints() {
        return complaintRepository.findAll().stream()
                .map(this::mapToComplaintResponse)
                .toList();
    }

    @Override
    public ComplaintResponse updateComplaint(UUID id, UpdateComplaintRequest request) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));

        if (request.getStatus() != null) {
            complaint.setStatus(ComplaintStatus.valueOf(request.getStatus().toUpperCase()));
        }
        if (request.getResolution() != null) {
            complaint.setResolution(request.getResolution());
        }

        return mapToComplaintResponse(complaintRepository.save(complaint));
    }

    private void upsertDriverEarning(Shipment shipment, UUID driverId) {
        DriverEarning earning = driverEarningRepository.findByShipmentId(shipment.getId())
                .orElseGet(() -> DriverEarning.builder()
                        .shipment(shipment)
                        .driverId(driverId)
                        .status(EarningStatus.CALCULATED)
                        .build());

        earning.setDriverId(driverId);
        earning.setAmount(calculateDriverEarning(shipment));
        driverEarningRepository.save(earning);
    }

    private BigDecimal calculateDriverEarning(Shipment shipment) {
        // Placeholder commission logic: drivers earn 70% of the shipment charge.
        return resolveAmount(shipment.getShippingCost())
                .multiply(BigDecimal.valueOf(0.70))
                .setScale(2, RoundingMode.HALF_UP);
    }

    private Shipment getShipment(UUID shipmentId) {
        return shipmentRepository.findById(shipmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Shipment not found"));
    }

    private String resolveTrackingId(String trackingId) {
        if (trackingId != null && !trackingId.isBlank()) {
            return trackingId;
        }
        return "STRK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private UUID parseRequiredUuid(String value, String fieldName) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(fieldName + " is required");
        }
        return UUID.fromString(value);
    }

    private UUID parseOptionalUuid(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return UUID.fromString(value);
    }

    private BigDecimal resolveAmount(BigDecimal amount) {
        if (amount == null) {
            return BigDecimal.ZERO;
        }
        return amount.setScale(2, RoundingMode.HALF_UP);
    }

    private ShipmentResponse mapToResponse(Shipment shipment) {
        return ShipmentResponse.builder()
                .id(shipment.getId())
                .trackingId(shipment.getTrackingId())
                .status(shipment.getStatus().name())
                .customerId(shipment.getCustomerId())
                .receiverId(shipment.getReceiverId())
                .assignedDriverId(shipment.getAssignedDriverId())
                .origin(shipment.getOrigin())
                .destination(shipment.getDestination())
                .weight(shipment.getWeight())
                .dimensions(shipment.getDimensions())
                .shippingCost(shipment.getShippingCost())
                .expectedDeliveryDate(shipment.getExpectedDeliveryDate())
                .actualDeliveryDate(shipment.getActualDeliveryDate())
                .createdAt(shipment.getCreatedAt())
                .build();
    }

    private PaymentResponse mapToPaymentResponse(Payment payment) {
        return PaymentResponse.builder()
                .id(payment.getId())
                .shipmentId(payment.getShipment().getId())
                .customerId(payment.getCustomerId())
                .amount(payment.getAmount())
                .status(payment.getStatus().name())
                .paymentMethod(payment.getPaymentMethod())
                .transactionReference(payment.getTransactionReference())
                .paidAt(payment.getPaidAt())
                .createdAt(payment.getCreatedAt())
                .build();
    }

    private DriverEarningResponse mapToDriverEarningResponse(DriverEarning earning) {
        return DriverEarningResponse.builder()
                .id(earning.getId())
                .shipmentId(earning.getShipment().getId())
                .driverId(earning.getDriverId())
                .amount(earning.getAmount())
                .status(earning.getStatus().name())
                .createdAt(earning.getCreatedAt())
                .build();
    }

    private ComplaintResponse mapToComplaintResponse(Complaint complaint) {
        return ComplaintResponse.builder()
                .id(complaint.getId())
                .shipmentId(complaint.getShipment().getId())
                .customerId(complaint.getCustomerId())
                .subject(complaint.getSubject())
                .description(complaint.getDescription())
                .status(complaint.getStatus().name())
                .resolution(complaint.getResolution())
                .createdAt(complaint.getCreatedAt())
                .updatedAt(complaint.getUpdatedAt())
                .build();
    }
}