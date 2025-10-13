package com.todo.backend.dto;

import com.todo.backend.entity.Priority;
import com.todo.backend.entity.Status;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TaskResponse {
    private Long id;
    private String name;
    private String description;
    private Priority priority;
    private Status status;
    private LocalDateTime createdDate;
    private LocalDateTime completedDate;
    private String imageUrl;
    private String assignedUsername;
}
