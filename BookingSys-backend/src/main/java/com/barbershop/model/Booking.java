package com.barbershop.model;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Booking {
    private Long id;
    private User user;
    private Barber barber;
    private LocalDateTime date;
} 