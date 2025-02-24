package com.barbershop.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.barbershop.model.Booking;
import com.barbershop.repository.BookingRepository;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> findByBarberIdAndDate(Long barberId, LocalDate date) {
        return bookingRepository.findByBarberIdAndDate(barberId, date);
    }

    public void cancelBooking(Long id) {
        bookingRepository.deleteById(id);
    }
} 