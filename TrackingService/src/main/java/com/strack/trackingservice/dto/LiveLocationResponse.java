package com.strack.trackingservice.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class LiveLocationResponse {
    private UUID shipmentId;
    private Double latitude;
    private Double longitude;
    private String location;
    private LocalDateTime lastUpdated;
}
