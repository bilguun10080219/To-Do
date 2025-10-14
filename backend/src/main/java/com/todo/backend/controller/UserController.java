package com.todo.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.todo.backend.dto.UpdateUserRequest;
import com.todo.backend.dto.ChangePasswordRequest;
import com.todo.backend.entity.User;
import com.todo.backend.service.UserService;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@CrossOrigin(origins = {
    "http://localhost:3000",
    "https://to-do-pi-ochre-94.vercel.app"
})
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody UpdateUserRequest request) {
        User updated = userService.updateUser(request.getUsername(), request.getNewUsername(), request.getNewEmail());
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        userService.changePassword(request.getUsername(), request.getCurrentPassword(), request.getNewPassword());
        return ResponseEntity.ok("Password updated successfully");
    }
}
