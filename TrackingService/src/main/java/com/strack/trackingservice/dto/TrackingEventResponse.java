package com.strack.trackingservice.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class TrackingEventResponse {

    private UUID id;
    private UUID shipmentId;
    private String status;
    private String location;

    private Double latitude;
    private Double longitude;

    private String remarks;
    private LocalDateTime eventTime;
}