package com.todo.backend.controller;

import com.todo.backend.dto.LoginRequest;
import com.todo.backend.dto.LoginResponse;
import com.todo.backend.dto.RegisterRequest;
import com.todo.backend.entity.User;
import com.todo.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request){
        if(request.getUsername() == null || request.getEmail() == null || request.getPassword() == null){
            return ResponseEntity.badRequest().body("username, email and password are required");
        }

        if(userService.findByUsername(request.getUsername()).isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole() == null ? "USER" : request.getRole());

        user.setPassword(request.getPassword());

        User saved = userService.save(user);
        return ResponseEntity.ok(saved);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request){
        Optional<User> opt = userService.findByUsername(request.getUsername());
        if(opt.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        User user = opt.get();
        if(!request.getPassword().equals(user.getPassword())){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
        return ResponseEntity.ok(new LoginResponse(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getRole()
            ));
    }

    public static class LoginResponse {
    public Long id;
    public String username;
    public String email;
    public String role;

    public LoginResponse(Long id, String username, String email, String role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
    }
}


    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session){
        session.invalidate();
        return ResponseEntity.ok("Logged out");
    }
}
