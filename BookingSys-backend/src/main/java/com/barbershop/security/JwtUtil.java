package com.barbershop.security;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

@Component
public class JwtUtil {
    @Value("${jwt.secret:default-secret-key}")
    private String secret;

    @Value("${jwt.expiration:86400000}")
    private long expiration;

    public String generateToken(String username) {
        return JWT.create()
                .withSubject(username)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + expiration))
                .sign(Algorithm.HMAC512(secret.getBytes()));
    }

    public boolean validateToken(String token, String username) {
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC512(secret.getBytes())).build();
            DecodedJWT jwt = verifier.verify(token);
            return jwt.getSubject().equals(username);
        } catch (JWTVerificationException e) {
            // Handle verification failure (invalid signature, expired token, etc.)
            return false;
        }
    }

    public String extractUsername(String token) {
        try {
            DecodedJWT jwt = JWT.decode(token);
            return jwt.getSubject();
        } catch (JWTDecodeException e) {
            // Handle token decode failure
            return null;
        }
    }

    public String validateTokenAndGetUsername(String token) {
        return JWT.require(Algorithm.HMAC512(secret.getBytes()))
            .build()
            .verify(token)
            .getSubject();
    }
}
