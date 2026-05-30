package com.strack.notificationservice.dto;

import lombok.Data;

@Data
public class CreateNotificationRequest {

    private String userId;
    private String shipmentId;
    private String type;
    private String message;
}