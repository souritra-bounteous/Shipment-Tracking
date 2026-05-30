package com.strack.trackingservice.dto;

import lombok.Data;

@Data
public class CreateTrackingEventRequest {

    private String shipmentId;
    private String status;
    private String location;

    private Double latitude;
    private Double longitude;

    private String remarks;
    private String updatedBy;
}