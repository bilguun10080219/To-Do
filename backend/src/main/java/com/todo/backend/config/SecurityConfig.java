package com.todo.backend.config;

import com.todo.backend.security.JwtAuthFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import java.util.List;

@Configuration
public class SecurityConfig {

    private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        logger.info("===============================================");
        logger.info("🛡️  Initializing Security Configuration...");
        logger.info("===============================================");

        http
            .cors(cors -> cors.configurationSource(request -> {
                logger.info("[CORS] Applying inline CORS configuration for request: {}", request.getRequestURI());
                var corsConfig = new org.springframework.web.cors.CorsConfiguration();
                corsConfig.setAllowedOrigins(List.of(
                        "http://localhost:3000/",
                        "https://to-do-pi-ochre-94.vercel.app/",
                        "https://to-do-330q.onrender.com"
                ));
                corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                corsConfig.setAllowedHeaders(List.of("*"));
                corsConfig.setAllowCredentials(true);

                logger.info("[CORS] Allowed Origins: {}", corsConfig.getAllowedOrigins());
                logger.info("[CORS] Allowed Methods: {}", corsConfig.getAllowedMethods());
                return corsConfig;
            }))
            .csrf(csrf -> {
                logger.info("[SECURITY] CSRF disabled ✅");
                csrf.disable();
            })
            .authorizeHttpRequests(auth -> {
                logger.info("[SECURITY] Setting up request authorization rules...");
                auth
                    .requestMatchers(HttpMethod.OPTIONS, "/").permitAll()
                    .requestMatchers("/api/auth/", "/api/users/").permitAll()
                    .requestMatchers("/api/tasks/").authenticated()
                    .anyRequest().authenticated();
            })
            .addFilterBefore(new JwtAuthFilter(), UsernamePasswordAuthenticationFilter.class);

        logger.info("[SECURITY] JwtAuthFilter successfully added before UsernamePasswordAuthenticationFilter ✅");
        logger.info("[SECURITY] Security filter chain initialized successfully 🚀");

        return http.build();
    }
}
