package com.strack.trackingservice.service;


import com.strack.trackingservice.dto.CreateTrackingEventRequest;
import com.strack.trackingservice.dto.TrackingEventResponse;
import com.strack.trackingservice.dto.TrackingHistoryResponse;

public interface TrackingService {

    TrackingEventResponse addTrackingEvent(CreateTrackingEventRequest request);

    TrackingHistoryResponse getTrackingHistory(String shipmentId);
}