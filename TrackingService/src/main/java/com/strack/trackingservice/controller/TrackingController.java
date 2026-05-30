package com.strack.trackingservice.controller;

import com.strack.trackingservice.dto.CreateTrackingEventRequest;
import com.strack.trackingservice.dto.TrackingEventResponse;
import com.strack.trackingservice.dto.TrackingHistoryResponse;
import com.strack.trackingservice.service.TrackingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tracking")
@RequiredArgsConstructor
public class TrackingController {

    private final TrackingService trackingService;

    @PostMapping
    public TrackingEventResponse addTrackingEvent(
            @RequestBody CreateTrackingEventRequest request) {
        return trackingService.addTrackingEvent(request);
    }

    @GetMapping("/{shipmentId}")
    public TrackingHistoryResponse getTrackingHistory(
            @PathVariable String shipmentId) {
        return trackingService.getTrackingHistory(shipmentId);
    }
}