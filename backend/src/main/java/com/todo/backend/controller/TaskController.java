package com.todo.backend.controller;

import com.todo.backend.dto.TaskRequest;
import com.todo.backend.dto.TaskResponse;
import com.todo.backend.entity.User;
import com.todo.backend.service.TaskService;
import com.todo.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;


import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {
        "http://localhost:3000",
        "https://to-do-pi-ochre-94.vercel.app",
        "https://to-do-330q.onrender.com"
})
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;

    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    private Optional<User> findUser(TaskRequest request) {
        return userService.findByUsername(request.getUsername());
    }

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody TaskRequest request) {
        try {
            Optional<User> creatorOpt = userService.findByUsername(request.getUsername());
            User creator = creatorOpt.orElse(null);

            // Default assigned user is creator
            User assignedUser = creator;

            // If creator is admin and provided assigned username, try to find that user
            if (creator != null
                    && creator.getRole() != null
                    && creator.getRole().toUpperCase().contains("ADMIN")
                    && request.getAssignedUsername() != null) {

                Optional<User> assignedOpt = userService.findByUsername(request.getAssignedUsername());
                if (assignedOpt.isEmpty()) {
                    return ResponseEntity.badRequest().body("Assigned user not found");
                }
                assignedUser = assignedOpt.get();
            }

            TaskResponse response = taskService.createTask(request, assignedUser);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error creating task: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskById(@PathVariable Long id,
            @RequestParam(required = false) String username) {
        User user = null;
        if (username != null && !username.isBlank()) {
            Optional<User> userOpt = userService.findByUsername(username);
            if (userOpt.isEmpty())
                return ResponseEntity.status(401).body("User not found");
            user = userOpt.get();
        }

        try {
            TaskResponse taskResponse = taskService.getTaskById(id, user);
            return ResponseEntity.ok(taskResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getTasks(
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String search,
            Authentication authentication) {

        String requester = authentication.getName(); // JWT-ээс орж ирсэн username
        User requesterUser = userService.findByUsername(requester)
                .orElseThrow(() -> new RuntimeException("Requester not found"));

        List<TaskResponse> tasks;
        if (requesterUser.getRole().equalsIgnoreCase("ADMIN") && (username == null || username.isBlank())) {
            tasks = taskService.getAllTasks();
        } else {
            if (username == null || username.isBlank())
                username = requesterUser.getUsername();
            User user = userService.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            tasks = (search != null && !search.isBlank())
                    ? taskService.searchTasks(user, search)
                    : taskService.getTasks(user);
        }
        return ResponseEntity.ok(tasks);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody TaskRequest request) {
        Optional<User> userOpt = userService.findByUsername(request.getUsername());
        User user = userOpt.orElse(null);

        User assignedUser = user;

        if (user != null
                && user.getRole() != null
                && user.getRole().toUpperCase().contains("ADMIN")
                && request.getAssignedUsername() != null) {

            Optional<User> assignedOpt = userService.findByUsername(request.getAssignedUsername());
            if (assignedOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Assigned user not found");
            }
            assignedUser = assignedOpt.get();
        }

        try {
            return ResponseEntity.ok(taskService.updateTask(id, request, assignedUser));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id,
            @RequestParam String username) {
        Optional<User> userOpt = userService.findByUsername(username);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("User not found");
        }

        try {
            taskService.deleteTask(id, userOpt.get());
            return ResponseEntity.ok("Task deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

}
