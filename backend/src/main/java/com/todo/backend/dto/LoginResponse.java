package com.todo.backend.dto;

public class LoginResponse {
    private Long id;
    private String email;
    private String username;
    private String role;
    private String token;
    private String tokenType = "Bearer";

    public LoginResponse(Long id, String username, String email, String role, String token) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.token = token;
    }

    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getUsername() { return username; }
    public String getRole() { return role; }
    public String getToken() { return token; }
    public String getTokenType() { return tokenType; }
}
