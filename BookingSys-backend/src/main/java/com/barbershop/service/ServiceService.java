package com.barbershop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.barbershop.model.BarberService;
import com.barbershop.repository.BarberServiceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServiceService {
    private final BarberServiceRepository serviceRepository;
    
    public List<BarberService> getAllServices() {
        return serviceRepository.findAll();
    }
    
    public BarberService createService(BarberService service) {
        return serviceRepository.save(service);
    }
} 