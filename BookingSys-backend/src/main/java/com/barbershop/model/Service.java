package com.barbershop.model;

import lombok.Data;

@Data
public class Service {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer duration;
} 