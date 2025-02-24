package com.barbershop.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.barbershop.dto.TimeSlotDTO;
import com.barbershop.model.Booking;
import com.barbershop.repository.BookingRepository;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BarberService {
    private final BookingRepository bookingRepository;
    private final EmailService emailService;
    private static final Logger log = LoggerFactory.getLogger(BarberService.class);

    public List<TimeSlotDTO> getAvailableTimeSlots(Long barberId, LocalDate date) {
        // Get barber's working hours for the given day
        List<TimeSlotDTO> slots = generateTimeSlots();
        
        // Get existing bookings
        List<Booking> existingBookings = bookingRepository
            .findByBarberIdAndDate(barberId, date);
        
        // Mark slots as unavailable if booked
        for (Booking booking : existingBookings) {
            slots.stream()
                .filter(slot -> slot.getTime().equals(
                    booking.getDate().toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm"))))
                .forEach(slot -> slot.setAvailable(false));
        }
        
        return slots;
    }

    private List<TimeSlotDTO> generateTimeSlots() {
        List<TimeSlotDTO> slots = new ArrayList<>();
        LocalTime start = LocalTime.of(9, 0); // 9 AM
        LocalTime end = LocalTime.of(17, 0);  // 5 PM
        
        while (start.isBefore(end)) {
            slots.add(new TimeSlotDTO(
                start.format(DateTimeFormatter.ofPattern("HH:mm")),
                true
            ));
            start = start.plusMinutes(30); // 30-minute slots
        }
        
        return slots;
    }

    public void cancelBooking(Long bookingId) {
        try {
            Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
                
            emailService.sendCancellationConfirmation(
                booking.getUser().getEmail(),
                booking.getUser().getName()
            );
            
            bookingRepository.deleteById(bookingId);
        } catch (MessagingException e) {
            // Log error but still cancel booking
            log.error("Failed to send cancellation email", e);
            bookingRepository.deleteById(bookingId);
        }
    }

    public Booking createBooking(Booking booking) {
        try {
            Booking saved = bookingRepository.save(booking);
            
            emailService.sendBookingConfirmation(
                saved.getUser().getEmail(),
                saved.getUser().getName(),
                saved.getDate().toLocalDate().toString(),
                saved.getDate().toLocalTime().toString()
            );
            
            return saved;
        } catch (MessagingException e) {
            log.error("Failed to send confirmation email", e);
            return bookingRepository.save(booking);
        }
    }
} 