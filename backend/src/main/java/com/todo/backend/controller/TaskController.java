package com.todo.backend.controller;

import com.todo.backend.dto.TaskRequest;
import com.todo.backend.dto.TaskResponse;
import com.todo.backend.entity.User;
import com.todo.backend.service.TaskService;
import com.todo.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
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
        Optional<User> userOpt = findUser(request);
        if (userOpt.isEmpty()) return ResponseEntity.status(401).body("User not found");
        return ResponseEntity.ok(taskService.createTask(request, userOpt.get()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskById(@PathVariable Long id,
                                         @RequestParam(required = false) String username) {
        User user = null;
        if (username != null && !username.isBlank()) {
            Optional<User> userOpt = userService.findByUsername(username);
            if (userOpt.isEmpty()) return ResponseEntity.status(401).body("User not found");
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
    public ResponseEntity<?> getTasks(@RequestParam(required = false) String username,
                                      @RequestParam(required = false) String search) {
        List<TaskResponse> tasks;

        if (username == null || username.isBlank()) {
            // Admin: return all tasks
            tasks = taskService.getAllTasks();
        } else {
            Optional<User> userOpt = userService.findByUsername(username);
            if (userOpt.isEmpty()) return ResponseEntity.status(401).body("User not found");
            User user = userOpt.get();

            if (search != null && !search.isBlank()) {
                tasks = taskService.searchTasks(user, search);
            } else {
                tasks = taskService.getTasks(user);
            }
        }

        return ResponseEntity.ok(tasks);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody TaskRequest request) {
        Optional<User> userOpt = userService.findByUsername(request.getUsername());
        User user = userOpt.orElse(null); // null = admin fallback
        return ResponseEntity.ok(taskService.updateTask(id, request, user));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id,
                                        @RequestParam String username) {
        Optional<User> userOpt = userService.findByUsername(username);
        if (userOpt.isEmpty()) return ResponseEntity.status(401).body("User not found");
        taskService.deleteTask(id, userOpt.get());
        return ResponseEntity.ok("Task deleted");
    }
}
