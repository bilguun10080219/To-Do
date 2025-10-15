package com.todo.backend.controller;

import com.todo.backend.dto.UpdateUserRequest;
import com.todo.backend.dto.ChangePasswordRequest;
import com.todo.backend.entity.User;
import com.todo.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = {
    "http://localhost:3000",
    "https://to-do-pi-ochre-94.vercel.app",
    "https://to-do-330q.onrender.com" 
})
public class UserController {

    private final UserService userService;


    @GetMapping
    public ResponseEntity<?> getAllUsers(Authentication authentication) {
        String requester = authentication.getName();
        User user = userService.findByUsername(requester)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getRole().equalsIgnoreCase("ADMIN")) {
            return ResponseEntity.status(403).body("Access denied: Admin only");
        }

        return ResponseEntity.ok(userService.findAll());
    }


    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody UpdateUserRequest request, Authentication authentication) {
        String requester = authentication.getName();

        if (!requester.equals(request.getUsername())) {
            return ResponseEntity.status(403).body("Access denied: Cannot update other user");
        }

        User updated = userService.updateUser(request.getUsername(), request.getNewUsername(), request.getNewEmail());
        updated.setPassword(null); 
        return ResponseEntity.ok(updated);
    }

   
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, Authentication authentication) {
        String requester = authentication.getName();

        if (!requester.equals(request.getUsername())) {
            return ResponseEntity.status(403).body("Access denied: Cannot change password for other user");
        }

        userService.changePassword(request.getUsername(), request.getCurrentPassword(), request.getNewPassword());
        return ResponseEntity.ok("Password updated successfully");
    }
}
