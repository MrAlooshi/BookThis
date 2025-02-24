package com.barbershop.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class BookingRequest {
    private Long barberId;
    private Long serviceId;
    private LocalDateTime dateTime;
} 