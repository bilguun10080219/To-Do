package com.todo.backend.service;

import com.todo.backend.dto.TaskRequest;
import com.todo.backend.dto.TaskResponse;
import com.todo.backend.entity.User;

import java.util.List;

public interface TaskService {
    TaskResponse createTask(TaskRequest request, User user);
    List<TaskResponse> getTasks(User user);
    TaskResponse updateTask(Long id, TaskRequest request, User user);
    void deleteTask(Long id, User user);
    TaskResponse getTaskById(Long id, User user);
    List<TaskResponse> searchTasks(User user, String search);
}
