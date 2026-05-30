package com.strack.notificationservice.controller;

import com.strack.notificationservice.dto.CreateNotificationRequest;
import com.strack.notificationservice.dto.NotificationResponse;
import com.strack.notificationservice.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping
    public NotificationResponse createNotification(
            @RequestBody CreateNotificationRequest request) {
        return notificationService.createNotification(request);
    }

    @PostMapping("/{id}/send")
    public NotificationResponse sendNotification(@PathVariable UUID id) {
        return notificationService.sendNotification(id);
    }

    @GetMapping("/user/{userId}")
    public List<NotificationResponse> getUserNotifications(
            @PathVariable String userId) {
        return notificationService.getUserNotifications(userId);
    }
}