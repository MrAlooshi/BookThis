package com.barbershop.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.barbershop.model.Barber;

@Repository
public class BarberRepository extends BaseRepository<Barber> {
    @Override
    public List<Barber> findAll() {
        return new ArrayList<>(items.values());
    }

    @Override
    public Optional<Barber> findById(Long id) {
        return Optional.ofNullable(items.get(id));
    }

    @Override
    public Barber save(Barber barber) {
        if (barber.getId() == null) {
            barber.setId(generateUniqueId());
        }
        items.put(barber.getId(), barber);
        return barber;
    }

    @Override
    public void deleteById(Long id) {
        items.remove(id);
    }
} 