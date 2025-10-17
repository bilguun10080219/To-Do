package com.todo.backend.service;

import com.todo.backend.entity.User;
import com.todo.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.todo.backend.security.JwtUtil;
import java.util.*;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Map<String, Object> updateUser(String currentUsername, String newUsername, String newEmail) {
        User user = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(newUsername);
        user.setEmail(newEmail);
        User updatedUser = userRepository.save(user);

        String newToken = JwtUtil.generateToken(updatedUser.getUsername(), updatedUser.getRole());

        Map<String, Object> response = new HashMap<>();
        response.put("username", updatedUser.getUsername());
        response.put("email", updatedUser.getEmail());
        response.put("token", newToken);
        return response;
    }

    public Map<String, Object> changePassword(String username, String currentPassword, String newPassword) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        User updatedUser = userRepository.save(user);

        String newToken = JwtUtil.generateToken(updatedUser.getUsername(), updatedUser.getRole());


        Map<String, Object> response = new HashMap<>();
        response.put("message", "Password changed successfully");
        response.put("token", newToken);
        return response;
    }
}
