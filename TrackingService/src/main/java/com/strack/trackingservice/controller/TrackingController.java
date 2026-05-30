package com.strack.trackingservice.controller;

import com.strack.trackingservice.dto.CreateTrackingEventRequest;
import com.strack.trackingservice.dto.LiveLocationResponse;
import com.strack.trackingservice.dto.ProofOfDeliveryResponse;
import com.strack.trackingservice.dto.TrackingEventResponse;
import com.strack.trackingservice.dto.TrackingHistoryResponse;
import com.strack.trackingservice.service.TrackingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/api/tracking")
@RequiredArgsConstructor
public class TrackingController {

    private final TrackingService trackingService;

    @PostMapping("/event")
    public TrackingEventResponse addTrackingEvent(
            @RequestBody CreateTrackingEventRequest request) {
        return trackingService.addTrackingEvent(request);
    }

    @GetMapping("/shipment/{shipmentId}")
    public TrackingHistoryResponse getTrackingHistory(
            @PathVariable UUID shipmentId) {
        return trackingService.getTrackingHistory(shipmentId);
    }

    @GetMapping("/location/{shipmentId}")
    public LiveLocationResponse getLatestLocation(@PathVariable UUID shipmentId) {
        return trackingService.getLatestLocation(shipmentId);
    }

    @PostMapping("/proof")
    public ProofOfDeliveryResponse uploadProofOfDelivery(
            @RequestParam UUID shipmentId,
            @RequestPart("photo") MultipartFile photo,
            @RequestPart("signature") MultipartFile signature) {
        return trackingService.uploadProofOfDelivery(shipmentId, photo, signature);
    }
}