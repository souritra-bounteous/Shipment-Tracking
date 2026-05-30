package com.strack.trackingservice.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class ProofOfDeliveryResponse {
    private UUID id;
    private UUID shipmentId;
    private String photoFileName;
    private String photoContentType;
    private String signatureFileName;
    private String signatureContentType;
    private LocalDateTime createdAt;
}
