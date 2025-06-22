package com.usp.buildconnect.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Esta configuração libera o acesso para o seu frontend
        registry.addMapping("/**") // Aplica a regra a todos os endpoints da sua API
                .allowedOrigins("http://localhost:5173") // Permite requisições vindas especificamente do seu app React
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Lista os métodos HTTP permitidos
                .allowedHeaders("*") // Permite todos os cabeçalhos (headers)
                .allowCredentials(true); // Permite o envio de credenciais (como cookies ou tokens de autorização)
    }
}