package com.barbershop.repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.barbershop.model.Booking;

@Repository
public class BookingRepository extends BaseRepository<Booking> {
    @Override
    public List<Booking> findAll() {
        return new ArrayList<>(items.values());
    }

    @Override
    public Optional<Booking> findById(Long id) {
        return Optional.ofNullable(items.get(id));
    }

    @Override
    public Booking save(Booking booking) {
        if (booking.getId() == null) {
            booking.setId(generateUniqueId());
        }
        items.put(booking.getId(), booking);
        return booking;
    }

    @Override
    public void deleteById(Long id) {
        items.remove(id);
    }

    public List<Booking> findByBarberIdAndDate(Long barberId, LocalDate date) {
        return items.values().stream()
            .filter(b -> b.getBarber().getId().equals(barberId) 
                && b.getDate().toLocalDate().equals(date))
            .collect(Collectors.toList());
    }
} 