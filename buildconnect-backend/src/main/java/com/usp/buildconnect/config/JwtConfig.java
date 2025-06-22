package com.usp.buildconnect.config;

import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.jsonwebtoken.security.Keys;

@Configuration
public class JwtConfig {

    @Value("${jwt.secret}")
    private String secretString;

    @Bean
    public SecretKey jwtSecretKey() {
        byte[] secretBytes = java.util.Base64.getUrlDecoder().decode(secretString);
        return Keys.hmacShaKeyFor(secretBytes);
    }
}