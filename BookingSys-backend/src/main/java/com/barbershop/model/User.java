package com.barbershop.model;

import java.util.HashSet;
import java.util.Set;

import lombok.Data;

@Data
public class User {
    private Long id;
    private String name;
    private String email;
    private String password;
    private Set<String> roles = new HashSet<>();

    public User() {
        this.roles.add("USER");
    }
} 