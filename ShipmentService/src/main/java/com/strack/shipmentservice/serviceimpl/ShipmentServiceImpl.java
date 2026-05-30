package com.strack.shipmentservice.serviceimpl;

import com.strack.shipmentservice.dto.CreateShipmentRequest;
import com.strack.shipmentservice.dto.ShipmentResponse;
import com.strack.shipmentservice.dto.UpdateShipmentStatusRequest;
import com.strack.shipmentservice.entity.Shipment;
import com.strack.shipmentservice.entity.ShipmentStatus;
import com.strack.shipmentservice.repository.ShipmentRepository;
import com.strack.shipmentservice.service.ShipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ShipmentServiceImpl implements ShipmentService {

    private final ShipmentRepository shipmentRepository;

    @Override
    public ShipmentResponse createShipment(CreateShipmentRequest request) {

        Shipment shipment = Shipment.builder()
                .trackingId(request.getTrackingId())
                .senderId(UUID.fromString(request.getSenderId()))
                .receiverId(UUID.fromString(request.getReceiverId()))
                .originAddressId(UUID.fromString(request.getOriginAddressId()))
                .destinationAddressId(UUID.fromString(request.getDestinationAddressId()))
                .weight(request.getWeight())
                .dimensions(request.getDimensions())
                .expectedDeliveryDate(request.getExpectedDeliveryDate())
                .status(ShipmentStatus.CREATED)
                .build();

        shipmentRepository.save(shipment);

        return mapToResponse(shipment);
    }

    @Override
    public ShipmentResponse getShipmentByTrackingId(String trackingId) {

        Shipment shipment = shipmentRepository.findByTrackingId(trackingId)
                .orElseThrow(() -> new RuntimeException("Shipment not found"));

        return mapToResponse(shipment);
    }

    @Override
    public ShipmentResponse updateShipmentStatus(String trackingId, UpdateShipmentStatusRequest request) {

        Shipment shipment = shipmentRepository.findByTrackingId(trackingId)
                .orElseThrow(() -> new RuntimeException("Shipment not found"));

        shipment.setStatus(ShipmentStatus.valueOf(request.getStatus()));

        if (ShipmentStatus.DELIVERED.name().equals(request.getStatus())) {
            shipment.setActualDeliveryDate(java.time.LocalDate.now());
        }

        shipmentRepository.save(shipment);

        return mapToResponse(shipment);
    }

    private ShipmentResponse mapToResponse(Shipment shipment) {
        return ShipmentResponse.builder()
                .id(shipment.getId())
                .trackingId(shipment.getTrackingId())
                .status(shipment.getStatus().name())
                .senderId(shipment.getSenderId())
                .receiverId(shipment.getReceiverId())
                .expectedDeliveryDate(shipment.getExpectedDeliveryDate())
                .actualDeliveryDate(shipment.getActualDeliveryDate())
                .build();
    }
}