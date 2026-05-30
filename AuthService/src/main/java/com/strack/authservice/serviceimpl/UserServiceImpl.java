package com.strack.authservice.serviceimpl;

import com.strack.authservice.dto.CreateDriverRequest;
import com.strack.authservice.dto.DriverProfileResponse;
import com.strack.authservice.dto.UpdateDriverRequest;
import com.strack.authservice.dto.UserResponse;
import com.strack.authservice.entity.DriverProfile;
import com.strack.authservice.entity.User;
import com.strack.authservice.entity.UserRole;
import com.strack.authservice.exception.ResourceNotFoundException;
import com.strack.authservice.repository.DriverProfileRepository;
import com.strack.authservice.repository.UserRepository;
import com.strack.authservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final DriverProfileRepository driverProfileRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse getUserById(UUID id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return mapToUserResponse(user);
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToUserResponse)
                .toList();
    }

    @Override
    public DriverProfileResponse createDriver(CreateDriverRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        if (driverProfileRepository.existsByLicenseNumber(request.getLicenseNumber())) {
            throw new IllegalArgumentException("License number already exists");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.DRIVER)
                .build();

        User savedUser = userRepository.save(user);

        DriverProfile profile = DriverProfile.builder()
                .user(savedUser)
                .licenseNumber(request.getLicenseNumber())
                .vehicleNumber(request.getVehicleNumber())
                .vehicleType(request.getVehicleType())
                .build();

        return mapToDriverResponse(driverProfileRepository.save(profile));
    }

    @Override
    public List<DriverProfileResponse> getAllDrivers() {
        return driverProfileRepository.findAll().stream()
                .map(this::mapToDriverResponse)
                .toList();
    }

    @Override
    public DriverProfileResponse getDriverById(UUID id) {
        return mapToDriverResponse(findDriver(id));
    }

    @Override
    public DriverProfileResponse updateDriver(UUID id, UpdateDriverRequest request) {
        DriverProfile profile = findDriver(id);

        if (request.getPhone() != null) {
            profile.getUser().setPhone(request.getPhone());
        }
        if (request.getLicenseNumber() != null) {
            profile.setLicenseNumber(request.getLicenseNumber());
        }
        if (request.getVehicleNumber() != null) {
            profile.setVehicleNumber(request.getVehicleNumber());
        }
        if (request.getVehicleType() != null) {
            profile.setVehicleType(request.getVehicleType());
        }
        if (request.getCurrentLatitude() != null) {
            profile.setCurrentLatitude(request.getCurrentLatitude());
        }
        if (request.getCurrentLongitude() != null) {
            profile.setCurrentLongitude(request.getCurrentLongitude());
        }
        if (request.getAvailable() != null) {
            profile.setAvailable(request.getAvailable());
        }

        userRepository.save(profile.getUser());
        return mapToDriverResponse(driverProfileRepository.save(profile));
    }

    private DriverProfile findDriver(UUID id) {
        return driverProfileRepository.findById(id)
                .or(() -> driverProfileRepository.findByUserId(id))
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found"));
    }

    private UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole().name())
                .active(user.getIsActive())
                .createdAt(user.getCreatedAt())
                .build();
    }

    private DriverProfileResponse mapToDriverResponse(DriverProfile profile) {
        User user = profile.getUser();
        return DriverProfileResponse.builder()
                .id(profile.getId())
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .licenseNumber(profile.getLicenseNumber())
                .vehicleNumber(profile.getVehicleNumber())
                .vehicleType(profile.getVehicleType())
                .currentLatitude(profile.getCurrentLatitude())
                .currentLongitude(profile.getCurrentLongitude())
                .available(profile.getAvailable())
                .createdAt(profile.getCreatedAt())
                .build();
    }
}