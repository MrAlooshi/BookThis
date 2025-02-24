package com.barbershop.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.barbershop.dto.UserRegistrationDto;
import com.barbershop.model.User;
import com.barbershop.repository.UserRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @PostConstruct
    public void init() {
        // Create a test user if none exists
        if (findByEmail("test@example.com") == null) {
            User user = new User();
            user.setEmail("test@example.com");
            user.setPassword(passwordEncoder.encode("password123"));
            userRepository.save(user);
        }
    }
    
    public User createUser(User user) {
        // Add validation/business logic here
        return userRepository.save(user);
    }
    
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User register(UserRegistrationDto registration) {
        User user = new User();
        user.setName(registration.getName());
        user.setEmail(registration.getEmail());
        user.setPassword(passwordEncoder.encode(registration.getPassword()));
        return userRepository.save(user);
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> 
            new RuntimeException("User not found"));
    }

    public User updateUser(Long id, User user) {
        user.setId(id);
        return userRepository.save(user);
    }
} 