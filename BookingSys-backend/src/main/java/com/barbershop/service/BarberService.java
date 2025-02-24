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
import com.barbershop.model.Barber;
import com.barbershop.model.Booking;
import com.barbershop.repository.BarberRepository;
import com.barbershop.repository.BookingRepository;

import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BarberService {
    private final BookingRepository bookingRepository;
    private final EmailService emailService;
    private final BarberRepository barberRepository;
    private static final Logger log = LoggerFactory.getLogger(BarberService.class);

    private static final LocalTime START_TIME = LocalTime.of(9, 0); // 9:00 AM
    private static final LocalTime END_TIME = LocalTime.of(17, 0);  // 5:00 PM
    private static final int SLOT_DURATION = 30; // 30 minutes per slot

    @PostConstruct
    public void init() {
        // Add some test barbers if repository is empty
        if (barberRepository.findAll().isEmpty()) {
            Barber barber1 = new Barber();
            barber1.setName("John Smith");
            barber1.setSpecialty("Classic Cuts");
            barberRepository.save(barber1);

            Barber barber2 = new Barber();
            barber2.setName("Mike Johnson");
            barber2.setSpecialty("Modern Styles");
            barberRepository.save(barber2);
        }
    }

    public List<TimeSlotDTO> getAvailableTimeSlots(Long barberId, LocalDate date) {
        List<TimeSlotDTO> availableSlots = new ArrayList<>();
        List<Booking> existingBookings = bookingRepository.findByBarberIdAndDate(barberId, date);

        LocalTime currentTime = START_TIME;
        while (currentTime.plusMinutes(SLOT_DURATION).isBefore(END_TIME) || 
               currentTime.plusMinutes(SLOT_DURATION).equals(END_TIME)) {
            
            final LocalTime slotTime = currentTime;
            boolean isAvailable = existingBookings.stream()
                .noneMatch(booking -> booking.getDate().toLocalTime().equals(slotTime));

            availableSlots.add(new TimeSlotDTO(
                currentTime.format(DateTimeFormatter.ofPattern("HH:mm")),
                isAvailable
            ));

            currentTime = currentTime.plusMinutes(SLOT_DURATION);
        }

        return availableSlots;
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