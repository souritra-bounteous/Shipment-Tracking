package com.strack.shipmentservice.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Map;

@Data
@Builder
public class DashboardResponse {
    private long totalShipments;
    private long assignedShipments;
    private long deliveredShipments;
    private long cancelledShipments;
    private BigDecimal totalRevenue;
    private Map<String, Long> shipmentsByStatus;
}
