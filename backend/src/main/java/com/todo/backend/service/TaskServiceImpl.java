package com.todo.backend.service;

import com.todo.backend.dto.TaskRequest;
import com.todo.backend.dto.TaskResponse;
import com.todo.backend.entity.Task;
import com.todo.backend.entity.User;
import com.todo.backend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserService userService;

    public TaskServiceImpl(TaskRepository taskRepository, UserService userService) {
        this.taskRepository = taskRepository;
        this.userService = userService;
    }

    @Override
    public TaskResponse createTask(TaskRequest request, User assignedUser) {
        Task task = new Task();
        task.setName(request.getName());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setStatus(request.getStatus());
        task.setImageUrl(request.getImageUrl());
        task.setUser(assignedUser);

        return toResponse(taskRepository.save(task));
    }

    @Override
    public TaskResponse getTaskById(Long id, User user) {
        Task task;
        if (user == null || "ADMIN".equalsIgnoreCase(user.getRole())) {
            task = taskRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Task not found"));
        } else {
            task = taskRepository.findByIdAndUser(id, user)
                    .orElseThrow(() -> new RuntimeException("Task not found or not yours"));
        }
        return toResponse(task);
    }

    @Override
    public List<TaskResponse> getTasks(User user) {
        List<Task> tasks;
        if (user == null || "ADMIN".equalsIgnoreCase(user.getRole())) {
            tasks = taskRepository.findAll();
        } else {
            tasks = taskRepository.findByUser(user);
        }
        return tasks.stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<TaskResponse> searchTasks(User user, String search) {
        List<Task> tasks;
        if (user == null || "ADMIN".equalsIgnoreCase(user.getRole())) {
            tasks = taskRepository.searchByNameOrDescription(search);
        } else {
            tasks = taskRepository.searchByUserAndNameOrDescription(user, search);
        }
        return tasks.stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<TaskResponse> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        return tasks.stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public TaskResponse updateTask(Long id, TaskRequest request, User assignedUser) {
        Task task;
        if (assignedUser == null || "ADMIN".equalsIgnoreCase(assignedUser.getRole())) {
            task = taskRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Task not found"));
        } else {
            task = taskRepository.findByIdAndUser(id, assignedUser)
                    .orElseThrow(() -> new RuntimeException("Task not found or not yours"));
        }

        task.setName(request.getName());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setStatus(request.getStatus());
        task.setImageUrl(request.getImageUrl());

        if (assignedUser != null && "ADMIN".equalsIgnoreCase(assignedUser.getRole())
                && request.getAssignedUsername() != null) {
            Optional<User> assignedOpt = userService.findByUsername(request.getAssignedUsername());
            assignedOpt.ifPresent(task::setUser);
        }

        return toResponse(taskRepository.save(task));
    }

    @Override
    public void deleteTask(Long id, User user) {
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        boolean isAdmin = user.getRole() != null && user.getRole().toUpperCase().contains("ADMIN");

        Task task;
        if (isAdmin) {
            task = taskRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Task not found"));
        } else {
            task = taskRepository.findByIdAndUser(id, user)
                    .orElseThrow(() -> new RuntimeException("Task not found or not yours"));
        }

        taskRepository.delete(task);
    }
private TaskResponse toResponse(Task task) {
    if (task == null) return null;

    TaskResponse response = new TaskResponse();
    response.setId(task.getId());
    response.setName(task.getName());
    response.setDescription(task.getDescription());
    response.setPriority(task.getPriority());
    response.setStatus(task.getStatus());
    response.setImageUrl(task.getImageUrl());
    if (task.getUser() != null) {
        response.setAssignedUserId(task.getUser().getId().toString()); // ID-г string болгоод дамжуулж байна
    }
    return response;
}
}