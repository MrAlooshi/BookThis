package com.barbershop.service;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.barbershop.dto.BookingRequest;
import com.barbershop.model.Booking;
import com.barbershop.model.User;
import com.barbershop.repository.BarberRepository;
import com.barbershop.repository.BookingRepository;
import com.barbershop.repository.UserRepository;

import jakarta.mail.MessagingException;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final BarberRepository barberRepository;
    private final EmailService emailService;
    private static final Logger log = LoggerFactory.getLogger(BookingService.class);

    public BookingService(BookingRepository bookingRepository, 
                         UserRepository userRepository,
                         BarberRepository barberRepository,
                         EmailService emailService) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.barberRepository = barberRepository;
        this.emailService = emailService;
    }

    public Booking createBooking(BookingRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // Create and save the booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setDate(request.getDateTime());
        booking.setBarber(barberRepository.findById(request.getBarberId())
            .orElseThrow(() -> new RuntimeException("Barber not found")));
        
        Booking savedBooking = bookingRepository.save(booking);

        // Send confirmation email
        try {
            emailService.sendBookingConfirmation(
                user.getEmail(),
                user.getName(),
                request.getDateTime().toLocalDate().toString(),
                request.getDateTime().toLocalTime().toString()
            );
        } catch (MessagingException e) {
            // Log error but don't fail the booking
            log.error("Failed to send confirmation email", e);
        }

        return savedBooking;
    }

    public List<Booking> findByBarberIdAndDate(Long barberId, LocalDate date) {
        return bookingRepository.findByBarberIdAndDate(barberId, date);
    }

    public List<Booking> findByUserEmail(String email) {
        return bookingRepository.findByUserEmail(email);
    }

    public void cancelBooking(Long id, String userEmail) {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        // Verify the booking belongs to the user
        if (!booking.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Not authorized to cancel this booking");
        }

        bookingRepository.deleteById(id);
    }
} 