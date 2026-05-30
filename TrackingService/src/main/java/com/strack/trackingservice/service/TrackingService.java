package com.strack.trackingservice.service;

import com.strack.trackingservice.dto.CreateTrackingEventRequest;
import com.strack.trackingservice.dto.LiveLocationResponse;
import com.strack.trackingservice.dto.ProofOfDeliveryResponse;
import com.strack.trackingservice.dto.TrackingEventResponse;
import com.strack.trackingservice.dto.TrackingHistoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface TrackingService {

    TrackingEventResponse addTrackingEvent(CreateTrackingEventRequest request);

    TrackingHistoryResponse getTrackingHistory(UUID shipmentId);

    LiveLocationResponse getLatestLocation(UUID shipmentId);

    ProofOfDeliveryResponse uploadProofOfDelivery(UUID shipmentId, MultipartFile photo, MultipartFile signature);
}