package com.barbershop.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.barbershop.model.Service;

@Repository
public class ServiceRepository extends BaseRepository<Service> {
    @Override
    public List<Service> findAll() {
        return new ArrayList<>(items.values());
    }

    @Override
    public Optional<Service> findById(Long id) {
        return Optional.ofNullable(items.get(id));
    }

    @Override
    public Service save(Service service) {
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

    public Service findByName(String name) {
        return items.values().stream()
            .filter(s -> s.getName().equals(name))
            .findFirst()
            .orElse(null);
    }
} 