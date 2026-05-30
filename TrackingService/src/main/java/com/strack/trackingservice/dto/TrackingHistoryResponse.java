package com.strack.trackingservice.dto;

import com.strack.trackingservice.dto.TrackingEventResponse;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TrackingHistoryResponse {

    private String shipmentId;
    private List<TrackingEventResponse> events;
}