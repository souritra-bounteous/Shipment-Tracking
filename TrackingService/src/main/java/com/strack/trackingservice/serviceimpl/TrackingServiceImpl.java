package com.strack.trackingservice.serviceimpl;

import com.strack.trackingservice.dto.CreateTrackingEventRequest;
import com.strack.trackingservice.dto.TrackingEventResponse;
import com.strack.trackingservice.dto.TrackingHistoryResponse;
import com.strack.trackingservice.entity.ShipmentCurrentLocation;
import com.strack.trackingservice.entity.TrackingEvent;
import com.strack.trackingservice.repository.ShipmentCurrentLocationRepository;
import com.strack.trackingservice.repository.TrackingEventRepository;
import com.strack.trackingservice.service.TrackingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrackingServiceImpl implements TrackingService {

    private final TrackingEventRepository trackingRepository;
    private final ShipmentCurrentLocationRepository locationRepository;

    @Override
    public TrackingEventResponse addTrackingEvent(CreateTrackingEventRequest request) {

        UUID shipmentId = UUID.fromString(request.getShipmentId());

        TrackingEvent event = TrackingEvent.builder()
                .shipmentId(shipmentId)
                .status(request.getStatus())
                .location(request.getLocation())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .remarks(request.getRemarks())
                .updatedBy(UUID.fromString(request.getUpdatedBy()))
                .build();

        trackingRepository.save(event);

        // Update current location
        ShipmentCurrentLocation location = ShipmentCurrentLocation.builder()
                .shipmentId(shipmentId)
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .build();

        locationRepository.save(location);

        return mapToResponse(event);
    }

    @Override
    public TrackingHistoryResponse getTrackingHistory(String shipmentId) {

        UUID id = UUID.fromString(shipmentId);

        List<TrackingEvent> events =
                trackingRepository.findByShipmentIdOrderByEventTimeAsc(id);

        List<TrackingEventResponse> responseList = events.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return TrackingHistoryResponse.builder()
                .shipmentId(shipmentId)
                .events(responseList)
                .build();
    }

    private TrackingEventResponse mapToResponse(TrackingEvent event) {

        return TrackingEventResponse.builder()
                .id(event.getId())
                .shipmentId(event.getShipmentId())
                .status(event.getStatus())
                .location(event.getLocation())
                .latitude(event.getLatitude())
                .longitude(event.getLongitude())
                .remarks(event.getRemarks())
                .eventTime(event.getEventTime())
                .build();
    }
}