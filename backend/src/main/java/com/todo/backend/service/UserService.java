package com.todo.backend.service;

import com.todo.backend.entity.User;
import com.todo.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User updateUser(String currentUsername, String newUsername, String newEmail) {
    User user = userRepository.findByUsername(currentUsername)
        .orElseThrow(() -> new RuntimeException("User not found"));
    user.setUsername(newUsername);
    user.setEmail(newEmail);
    return userRepository.save(user);
}

public void changePassword(String username, String currentPassword, String newPassword) {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("User not found"));

    if (!user.getPassword().equals(currentPassword)) {
        throw new RuntimeException("Current password is incorrect");
    }

    user.setPassword(newPassword);
    userRepository.save(user);
}

}