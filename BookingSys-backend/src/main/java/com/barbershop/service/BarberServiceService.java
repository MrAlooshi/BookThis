package com.barbershop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.barbershop.model.BarberService;
import com.barbershop.repository.BarberServiceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BarberServiceService {
    private final BarberServiceRepository barberServiceRepository;
    
    public List<BarberService> getAllServices() {
        return barberServiceRepository.findAll();
    }
    
    public BarberService createService(BarberService service) {
        return barberServiceRepository.save(service);
    }
} 