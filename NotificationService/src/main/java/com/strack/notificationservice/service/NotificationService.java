package com.strack.notificationservice.service;


import com.strack.notificationservice.dto.CreateNotificationRequest;
import com.strack.notificationservice.dto.NotificationResponse;

import java.util.List;
import java.util.UUID;

public interface NotificationService {

    NotificationResponse createNotification(CreateNotificationRequest request);

    NotificationResponse sendNotification(UUID notificationId);

    List<NotificationResponse> getUserNotifications(String userId);
}