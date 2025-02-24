package com.barbershop.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.barbershop.dto.TimeSlotDTO;
import com.barbershop.model.Barber;
import com.barbershop.repository.BarberRepository;
import com.barbershop.service.BarberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/barbers")
@RequiredArgsConstructor
public class BarberController {
    private final BarberRepository barberRepository;
    private final BarberService barberService;

    @GetMapping
    public ResponseEntity<List<Barber>> getAllBarbers() {
        return ResponseEntity.ok(barberRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Barber> getBarber(@PathVariable Long id) {
        return barberRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Barber> createBarber(@RequestBody Barber barber) {
        return ResponseEntity.ok(barberRepository.save(barber));
    }

    @GetMapping("/{id}/availability")
    public ResponseEntity<List<TimeSlotDTO>> getAvailability(
            @PathVariable Long id,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        
        List<TimeSlotDTO> availableSlots = barberService.getAvailableTimeSlots(id, date);
        return ResponseEntity.ok(availableSlots);
    }

    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long id) {
        barberService.cancelBooking(id);
        return ResponseEntity.ok().build();
    }
} 