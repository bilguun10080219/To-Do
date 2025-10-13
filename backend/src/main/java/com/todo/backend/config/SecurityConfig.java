package com.todo.backend.config;

import com.todo.backend.security.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
    .cors(cors -> {})
    .csrf(csrf -> csrf.disable())
    .authorizeHttpRequests(auth -> auth
        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
        .requestMatchers("/api/auth/**").permitAll()
        .requestMatchers("/api/tasks/**").permitAll()
        .requestMatchers("/api/users/**").permitAll()
        .anyRequest().authenticated()
    )
    .addFilterBefore(new JwtAuthFilter(), UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }
}
