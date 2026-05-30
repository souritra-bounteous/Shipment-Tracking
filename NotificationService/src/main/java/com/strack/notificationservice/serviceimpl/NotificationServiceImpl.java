package com.strack.notificationservice.serviceimpl;


import com.strack.notificationservice.dto.CreateNotificationRequest;
import com.strack.notificationservice.dto.NotificationResponse;
import com.strack.notificationservice.entity.Notification;
import com.strack.notificationservice.entity.NotificationType;
import com.strack.notificationservice.repository.NotificationRepository;
import com.strack.notificationservice.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public NotificationResponse createNotification(CreateNotificationRequest request) {

        Notification notification = Notification.builder()
                .userId(UUID.fromString(request.getUserId()))
                .shipmentId(UUID.fromString(request.getShipmentId()))
                .type(NotificationType.valueOf(request.getType()))
                .message(request.getMessage())
                .isSent(false)
                .build();

        notificationRepository.save(notification);

        return mapToResponse(notification);
    }

    @Override
    public NotificationResponse sendNotification(UUID notificationId) {

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        // Simulate sending (replace later with email/SMS integration)
        System.out.println("Sending " + notification.getType() +
                " notification: " + notification.getMessage());

        notification.setIsSent(true);
        notification.setSentAt(LocalDateTime.now());

        notificationRepository.save(notification);

        return mapToResponse(notification);
    }

    @Override
    public List<NotificationResponse> getUserNotifications(String userId) {

        List<Notification> notifications =
                notificationRepository.findByUserId(UUID.fromString(userId));

        return notifications.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private NotificationResponse mapToResponse(Notification notification) {

        return NotificationResponse.builder()
                .id(notification.getId())
                .userId(notification.getUserId())
                .shipmentId(notification.getShipmentId())
                .type(notification.getType().name())
                .message(notification.getMessage())
                .isSent(notification.getIsSent())
                .createdAt(notification.getCreatedAt())
                .sentAt(notification.getSentAt())
                .build();
    }
}