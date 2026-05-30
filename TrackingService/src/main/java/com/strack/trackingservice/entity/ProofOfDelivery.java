package com.strack.trackingservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "proof_of_deliveries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProofOfDelivery {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "shipment_id", nullable = false, unique = true)
    private UUID shipmentId;

    @Column(name = "photo_data", nullable = false, columnDefinition = "bytea")
    private byte[] photoData;

    @Column(name = "photo_file_name")
    private String photoFileName;

    @Column(name = "photo_content_type")
    private String photoContentType;

    @Column(name = "signature_data", nullable = false, columnDefinition = "bytea")
    private byte[] signatureData;

    @Column(name = "signature_file_name")
    private String signatureFileName;

    @Column(name = "signature_content_type")
    private String signatureContentType;

    @Builder.Default
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
