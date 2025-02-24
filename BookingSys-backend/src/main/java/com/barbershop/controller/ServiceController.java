package com.barbershop.controller;

import com.barbershop.model.BarberService;
import com.barbershop.service.BarberServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceController {
    private final BarberServiceService serviceService;
    
    @GetMapping
    public ResponseEntity<List<BarberService>> getAllServices() {
        return ResponseEntity.ok(serviceService.getAllServices());
    }
    
    @PostMapping
    public ResponseEntity<BarberService> createService(@RequestBody BarberService service) {
        return ResponseEntity.ok(serviceService.createService(service));
    }
} 