package com.barbershop.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    public void sendBookingConfirmation(String to, String name, String date, String time) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        
        helper.setTo(to);
        helper.setSubject("Booking Confirmation - BookThis");
        helper.setText(getBookingConfirmationTemplate(name, date, time), true);
        
        mailSender.send(message);
    }

    public void sendCancellationConfirmation(String to, String name) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        
        helper.setTo(to);
        helper.setSubject("Booking Cancellation - BookThis");
        helper.setText(getCancellationTemplate(name), true);
        
        mailSender.send(message);
    }

    private String getBookingConfirmationTemplate(String name, String date, String time) {
        return String.format("""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2563eb;">Booking Confirmation</h2>
                <p>Dear %s,</p>
                <p>Your appointment has been confirmed for:</p>
                <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p style="margin: 5px 0;"><strong>Date:</strong> %s</p>
                    <p style="margin: 5px 0;"><strong>Time:</strong> %s</p>
                </div>
                <p>We look forward to seeing you!</p>
                <p>Best regards,<br>BookThis Team</p>
            </div>
            """, name, date, time);
    }

    private String getCancellationTemplate(String name) {
        return String.format("""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2563eb;">Booking Cancellation</h2>
                <p>Dear %s,</p>
                <p>Your appointment has been cancelled successfully.</p>
                <p>Feel free to book another appointment at your convenience.</p>
                <p>Best regards,<br>BookThis Team</p>
            </div>
            """, name);
    }
} 