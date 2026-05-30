package com.strack.trackingservice.serviceimpl;

import com.strack.trackingservice.dto.CreateTrackingEventRequest;
import com.strack.trackingservice.dto.LiveLocationResponse;
import com.strack.trackingservice.dto.ProofOfDeliveryResponse;
import com.strack.trackingservice.dto.TrackingEventResponse;
import com.strack.trackingservice.dto.TrackingHistoryResponse;
import com.strack.trackingservice.entity.ProofOfDelivery;
import com.strack.trackingservice.entity.ShipmentCurrentLocation;
import com.strack.trackingservice.entity.ShipmentStatus;
import com.strack.trackingservice.entity.TrackingEvent;
import com.strack.trackingservice.exception.ResourceNotFoundException;
import com.strack.trackingservice.repository.ProofOfDeliveryRepository;
import com.strack.trackingservice.repository.ShipmentCurrentLocationRepository;
import com.strack.trackingservice.repository.TrackingEventRepository;
import com.strack.trackingservice.service.TrackingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrackingServiceImpl implements TrackingService {

    private final TrackingEventRepository trackingRepository;
    private final ShipmentCurrentLocationRepository locationRepository;
    private final ProofOfDeliveryRepository proofOfDeliveryRepository;

    @Override
    public TrackingEventResponse addTrackingEvent(CreateTrackingEventRequest request) {

        UUID shipmentId = parseRequiredUuid(request.getShipmentId(), "shipmentId");
        ShipmentStatus status = ShipmentStatus.valueOf(request.getStatus().toUpperCase());

        TrackingEvent event = TrackingEvent.builder()
                .shipmentId(shipmentId)
                .status(status)
                .location(request.getLocation())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .remarks(request.getRemarks())
                .updatedBy(parseOptionalUuid(request.getUpdatedBy()))
                .build();

        trackingRepository.save(event);

        ShipmentCurrentLocation location = locationRepository.findById(shipmentId)
                .orElseGet(() -> ShipmentCurrentLocation.builder()
                        .shipmentId(shipmentId)
                        .build());
        location.setLatitude(request.getLatitude());
        location.setLongitude(request.getLongitude());
        location.setLocation(request.getLocation());
        location.setLastUpdated(LocalDateTime.now());

        locationRepository.save(location);

        return mapToResponse(event);
    }

    @Override
    public TrackingHistoryResponse getTrackingHistory(UUID shipmentId) {

        List<TrackingEvent> events =
                trackingRepository.findByShipmentIdOrderByEventTimeAsc(shipmentId);

        List<TrackingEventResponse> responseList = events.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return TrackingHistoryResponse.builder()
                .shipmentId(shipmentId.toString())
                .events(responseList)
                .build();
    }

    @Override
    public LiveLocationResponse getLatestLocation(UUID shipmentId) {
        ShipmentCurrentLocation location = locationRepository.findById(shipmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Location not found"));

        return LiveLocationResponse.builder()
                .shipmentId(location.getShipmentId())
                .latitude(location.getLatitude())
                .longitude(location.getLongitude())
                .location(location.getLocation())
                .lastUpdated(location.getLastUpdated())
                .build();
    }

    @Override
    public ProofOfDeliveryResponse uploadProofOfDelivery(UUID shipmentId, MultipartFile photo, MultipartFile signature) {
        if (photo == null || photo.isEmpty()) {
            throw new IllegalArgumentException("photo is required");
        }
        if (signature == null || signature.isEmpty()) {
            throw new IllegalArgumentException("signature is required");
        }

        try {
            ProofOfDelivery proof = proofOfDeliveryRepository.findByShipmentId(shipmentId)
                    .orElseGet(() -> ProofOfDelivery.builder()
                            .shipmentId(shipmentId)
                            .build());

            proof.setPhotoData(photo.getBytes());
            proof.setPhotoFileName(photo.getOriginalFilename());
            proof.setPhotoContentType(photo.getContentType());
            proof.setSignatureData(signature.getBytes());
            proof.setSignatureFileName(signature.getOriginalFilename());
            proof.setSignatureContentType(signature.getContentType());

            return mapToProofResponse(proofOfDeliveryRepository.save(proof));
        } catch (IOException ex) {
            throw new IllegalArgumentException("Unable to read proof of delivery files");
        }
    }

    private TrackingEventResponse mapToResponse(TrackingEvent event) {

        return TrackingEventResponse.builder()
                .id(event.getId())
                .shipmentId(event.getShipmentId())
                .status(event.getStatus().name())
                .location(event.getLocation())
                .latitude(event.getLatitude())
                .longitude(event.getLongitude())
                .remarks(event.getRemarks())
                .eventTime(event.getEventTime())
                .build();
    }

    private ProofOfDeliveryResponse mapToProofResponse(ProofOfDelivery proof) {
        return ProofOfDeliveryResponse.builder()
                .id(proof.getId())
                .shipmentId(proof.getShipmentId())
                .photoFileName(proof.getPhotoFileName())
                .photoContentType(proof.getPhotoContentType())
                .signatureFileName(proof.getSignatureFileName())
                .signatureContentType(proof.getSignatureContentType())
                .createdAt(proof.getCreatedAt())
                .build();
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
}