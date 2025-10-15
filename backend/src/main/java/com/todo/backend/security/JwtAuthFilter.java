package com.todo.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

public class JwtAuthFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthFilter.class);

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        boolean skip = path.startsWith("/api/auth") || path.startsWith("/api/files");
        if (skip) {
            logger.debug("[JwtAuthFilter] Skipping filter for path: {}", path);
        }
        return skip;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                   HttpServletResponse response,
                                   FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            logger.debug("[JwtAuthFilter] No Bearer token found for path: {}", request.getRequestURI());
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        logger.debug("[JwtAuthFilter] Token detected: {}", token.substring(0, Math.min(15, token.length())) + "...");

        try {
            if (JwtUtil.validateToken(token)) {
                String username = JwtUtil.extractUsername(token);
                String role = JwtUtil.extractRole(token);

                logger.info("[JwtAuthFilter] Valid token for user: {} with role: {}", username, role);

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                username, null,
                                List.of(new SimpleGrantedAuthority("ROLE_" + role))
                        );

                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                logger.warn("[JwtAuthFilter] Invalid or expired token for request: {}", request.getRequestURI());
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid or expired token");
                SecurityContextHolder.clearContext();
                return;
            }
        } catch (Exception e) {
            logger.error("[JwtAuthFilter] Error validating JWT", e);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Error validating token");
            SecurityContextHolder.clearContext();
            return;
        }

        filterChain.doFilter(request, response);
    }
}
