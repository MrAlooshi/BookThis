package com.barbershop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.barbershop.model.BarberService;
import com.barbershop.repository.BarberServiceRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServiceService {
    private final BarberServiceRepository serviceRepository;
    
    @PostConstruct
    public void init() {
        // Add some test services if repository is empty
        if (serviceRepository.findAll().isEmpty()) {
            BarberService service1 = new BarberService();
            service1.setName("Haircut");
            service1.setDescription("Classic haircut with scissors");
            service1.setPrice(30.0);
            service1.setDuration(30);
            serviceRepository.save(service1);

            BarberService service2 = new BarberService();
            service2.setName("Beard Trim");
            service2.setDescription("Professional beard grooming");
            service2.setPrice(20.0);
            service2.setDuration(20);
            serviceRepository.save(service2);
        }
    }
    
    public List<BarberService> getAllServices() {
        return serviceRepository.findAll();
    }
    
    public BarberService createService(BarberService service) {
        return serviceRepository.save(service);
    }
} 