package com.todo.backend.dto;

import com.todo.backend.entity.Priority;
import com.todo.backend.entity.Status;
import lombok.Data;

@Data
public class TaskRequest {
    private String username;
    private String assignedUsername;
    private String name;
    private String description;
    private Priority priority;
    private Status status;
    private String imageUrl;
}
