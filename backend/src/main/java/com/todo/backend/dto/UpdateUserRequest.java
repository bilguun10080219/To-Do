package com.todo.backend.dto;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private String username;
    private String newUsername;
    private String newEmail;
}
