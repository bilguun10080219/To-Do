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

    @GetMapping
    public ResponseEntity<?> getTasks(@RequestParam String username) {
        Optional<User> userOpt = userService.findByUsername(username);
        if (userOpt.isEmpty()) return ResponseEntity.status(401).body("User not found");
        return ResponseEntity.ok(taskService.getTasks(userOpt.get()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody TaskRequest request) {
        Optional<User> userOpt = findUser(request);
        if (userOpt.isEmpty()) return ResponseEntity.status(401).body("User not found");
        return ResponseEntity.ok(taskService.updateTask(id, request, userOpt.get()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id, @RequestParam String username) {
        Optional<User> userOpt = userService.findByUsername(username);
        if (userOpt.isEmpty()) return ResponseEntity.status(401).body("User not found");
        taskService.deleteTask(id, userOpt.get());
        return ResponseEntity.ok("Task deleted");
    }
}
