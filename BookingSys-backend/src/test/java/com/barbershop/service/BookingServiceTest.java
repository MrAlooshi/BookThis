package com.barbershop.service;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.barbershop.model.Barber;
import com.barbershop.model.Booking;
import com.barbershop.model.User;
import com.barbershop.repository.BookingRepository;

@ExtendWith(MockitoExtension.class)
public class BookingServiceTest {

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private BarberService barberService;

    @Test
    void testCreateBooking() throws Exception {
        // Arrange
        User user = new User();
        user.setName("John Doe");
        user.setEmail("john@example.com");

        Barber barber = new Barber();
        barber.setName("Mike");

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setBarber(barber);
        booking.setDate(LocalDateTime.now().plusDays(1));

        when(bookingRepository.save(any(Booking.class))).thenReturn(booking);

        // Act
        barberService.createBooking(booking);

        // Assert
        verify(bookingRepository).save(booking);
        verify(emailService).sendBookingConfirmation(
            user.getEmail(),
            user.getName(),
            booking.getDate().toLocalDate().toString(),
            booking.getDate().toLocalTime().toString()
        );
    }

    @Test
    void testCancelBooking() throws Exception {
        // Arrange
        Long bookingId = 1L;
        User user = new User();
        user.setName("John Doe");
        user.setEmail("john@example.com");

        Booking booking = new Booking();
        booking.setId(bookingId);
        booking.setUser(user);

        when(bookingRepository.findById(bookingId)).thenReturn(java.util.Optional.of(booking));

        // Act
        barberService.cancelBooking(bookingId);

        // Assert
        verify(bookingRepository).deleteById(bookingId);
        verify(emailService).sendCancellationConfirmation(user.getEmail(), user.getName());
    }
} 