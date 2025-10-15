package com.todo.backend.controller;

import com.todo.backend.dto.TaskRequest;
import com.todo.backend.dto.TaskResponse;
import com.todo.backend.entity.User;
import com.todo.backend.service.TaskService;
import com.todo.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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


    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody TaskRequest request, Authentication authentication) {
        try {
            String currentUsername = authentication.getName();
            User creator = userService.findByUsername(currentUsername)
                    .orElseThrow(() -> new RuntimeException("Creator not found"));


            User assignedUser = creator;


            if ("ADMIN".equalsIgnoreCase(creator.getRole()) && request.getAssignedUsername() != null) {
                assignedUser = userService.findByUsername(request.getAssignedUsername())
                        .orElseThrow(() -> new RuntimeException("Assigned user not found"));
            }

            TaskResponse response = taskService.createTask(request, assignedUser);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error creating task: " + e.getMessage());
        }
    }


    @GetMapping
    public ResponseEntity<?> getTasks(
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String search,
            Authentication authentication) {

        String requester = authentication.getName();
        User requesterUser = userService.findByUsername(requester)
                .orElseThrow(() -> new RuntimeException("Requester not found"));

        List<TaskResponse> tasks;
        if ("ADMIN".equalsIgnoreCase(requesterUser.getRole()) && (username == null || username.isBlank())) {
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
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody TaskRequest request, Authentication authentication) {
        String currentUsername = authentication.getName();
        User currentUser = userService.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("User not found"));

        User assignedUser = currentUser;
        if ("ADMIN".equalsIgnoreCase(currentUser.getRole()) && request.getAssignedUsername() != null) {
            assignedUser = userService.findByUsername(request.getAssignedUsername())
                    .orElseThrow(() -> new RuntimeException("Assigned user not found"));
        }

        try {
            return ResponseEntity.ok(taskService.updateTask(id, request, assignedUser));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id, Authentication authentication) {
        String currentUsername = authentication.getName();
        User user = userService.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("User not found"));

        try {
            taskService.deleteTask(id, user);
            return ResponseEntity.ok("Task deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
