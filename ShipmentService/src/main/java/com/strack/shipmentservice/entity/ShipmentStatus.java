package com.strack.shipmentservice.entity;

public enum ShipmentStatus {
    CREATED,
    PACKED,
    PICKED_UP,
    IN_TRANSIT,
    OUT_FOR_DELIVERY,
    DELIVERED,
    DELAYED,
    LOST
}