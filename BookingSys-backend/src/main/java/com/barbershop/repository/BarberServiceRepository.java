package com.barbershop.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.barbershop.model.BarberService;

@Repository
public class BarberServiceRepository extends BaseRepository<BarberService> {
    @Override
    public List<BarberService> findAll() {
        return new ArrayList<>(items.values());
    }

    @Override
    public Optional<BarberService> findById(Long id) {
        return Optional.ofNullable(items.get(id));
    }

    @Override
    public BarberService save(BarberService service) {
        if (service.getId() == null) {
            service.setId(generateUniqueId());
        }
        items.put(service.getId(), service);
        return service;
    }

    @Override
    public void deleteById(Long id) {
        items.remove(id);
    }
} 