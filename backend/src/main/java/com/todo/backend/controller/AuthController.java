package com.todo.backend.controller;

import com.todo.backend.dto.LoginRequest;
import com.todo.backend.dto.LoginResponse;
import com.todo.backend.dto.RegisterRequest;
import com.todo.backend.entity.User;
import com.todo.backend.service.UserService;
import com.todo.backend.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
    "http://localhost:3000",
    "https://to-do-pi-ochre-94.vercel.app"
})

public class AuthController {

    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // ----------------- REGISTER -----------------
    @PostMapping("/register")
public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
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
    user.setPassword(passwordEncoder.encode(request.getPassword()));

    User saved = userService.save(user);
    return ResponseEntity.ok(saved);
}


    // ----------------- LOGIN -----------------
    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request){
    Optional<User> opt = userService.findByUsername(request.getUsername());
    if(opt.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");

    User user = opt.get();
    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }


    // Generate JWT
    String token = JwtUtil.generateToken(user.getUsername(), user.getRole());

    return ResponseEntity.ok(new LoginResponse(
        user.getId(),
        user.getUsername(),
        user.getEmail(),
        user.getRole(),
        token
    ));
}


    // ----------------- LOGOUT -----------------
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out");
    }
}
