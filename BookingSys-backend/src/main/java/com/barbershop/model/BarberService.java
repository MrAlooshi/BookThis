package com.barbershop.model;

import lombok.Data;

@Data
public class BarberService {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer duration;
} 