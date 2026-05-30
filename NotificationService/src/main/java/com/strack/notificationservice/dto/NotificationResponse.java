package com.strack.notificationservice.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class NotificationResponse {

    private UUID id;
    private UUID userId;
    private UUID shipmentId;
    private String type;
    private String message;
    private Boolean isSent;
    private LocalDateTime createdAt;
    private LocalDateTime sentAt;
}