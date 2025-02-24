package com.barbershop.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.barbershop.BookingSysApplication;
import com.barbershop.service.EmailService;

@SpringBootTest(classes = BookingSysApplication.class)
@ActiveProfiles("test")
public class EmailIntegrationTest {

    @Autowired
    private EmailService emailService;

    @Test
    void testSendEmail() throws Exception {
        emailService.sendBookingConfirmation(
            "test@example.com",
            "Test User",
            "2024-03-25",
            "14:00"
        );
    }
} 