package com.todo.backend.controller;

import com.todo.backend.dto.TaskRequest;
import com.todo.backend.dto.TaskResponse;
import com.todo.backend.entity.User;
import com.todo.backend.service.TaskService;
import com.todo.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {
    "http://localhost:3000",
    "https://to-do-pi-ochre-94.vercel.app",
    "https://to-do-330q.onrender.com"
})
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);

    private final TaskService taskService;
    private final UserService userService;

    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    // =========================
    // CREATE TASK
    // =========================
    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody TaskRequest request, Authentication authentication) {
        logger.info("=== [POST] /api/tasks - createTask called ===");
        logger.debug("Incoming TaskRequest: {}", request);

        try {
            String currentUsername = authentication.getName();
            logger.info("Authenticated username: {}", currentUsername);

            User creator = userService.findByUsername(currentUsername)
                    .orElseThrow(() -> new RuntimeException("Creator not found"));

            User assignedUser = creator;

            if ("ADMIN".equalsIgnoreCase(creator.getRole()) && request.getAssignedUsername() != null) {
                assignedUser = userService.findByUsername(request.getAssignedUsername())
                        .orElseThrow(() -> new RuntimeException("Assigned user not found"));
                logger.info("Task will be assigned to: {}", assignedUser.getUsername());
            } else {
                logger.info("Task assigned to creator: {}", creator.getUsername());
            }

            TaskResponse response = taskService.createTask(request, assignedUser);
            logger.info("Task created successfully: {}", response);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error creating task", e);
            return ResponseEntity.status(500).body("Error creating task: " + e.getMessage());
        }
    }

    // =========================
    // GET TASKS
    // =========================
    @GetMapping
    public ResponseEntity<?> getTasks(
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String search,
            Authentication authentication) {

        logger.info("=== [GET] /api/tasks - getTasks called ===");
        logger.debug("Params -> username: {}, search: {}", username, search);

        String requester = authentication.getName();
        logger.info("Requester: {}", requester);

        User requesterUser = userService.findByUsername(requester)
                .orElseThrow(() -> new RuntimeException("Requester not found"));

        try {
            List<TaskResponse> tasks;
            if ("ADMIN".equalsIgnoreCase(requesterUser.getRole()) && (username == null || username.isBlank())) {
                logger.info("ADMIN fetching all tasks");
                tasks = taskService.getAllTasks();
            } else {
                if (username == null || username.isBlank()) {
                    username = requesterUser.getUsername();
                }
                User user = userService.findByUsername(username)
                        .orElseThrow(() -> new RuntimeException("User not found"));
                logger.info("Fetching tasks for user: {}", username);

                if (search != null && !search.isBlank()) {
                    logger.info("Search filter applied: {}", search);
                    tasks = taskService.searchTasks(user, search);
                } else {
                    tasks = taskService.getTasks(user);
                }
            }
            logger.info("Total tasks found: {}", tasks.size());
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            logger.error("Error fetching tasks", e);
            return ResponseEntity.status(500).body("Error fetching tasks: " + e.getMessage());
        }
    }

    // =========================
    // UPDATE TASK
    // =========================
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody TaskRequest request, Authentication authentication) {
        logger.info("=== [PUT] /api/tasks/{} - updateTask called ===", id);
        logger.debug("Incoming TaskRequest: {}", request);

        String currentUsername = authentication.getName();
        logger.info("Authenticated username: {}", currentUsername);

        User currentUser = userService.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("User not found"));

        User assignedUser = currentUser;
        if ("ADMIN".equalsIgnoreCase(currentUser.getRole()) && request.getAssignedUsername() != null) {
            assignedUser = userService.findByUsername(request.getAssignedUsername())
                    .orElseThrow(() -> new RuntimeException("Assigned user not found"));
            logger.info("Reassigning task to: {}", assignedUser.getUsername());
        }

        try {
            TaskResponse updatedTask = taskService.updateTask(id, request, assignedUser);
            logger.info("Task updated successfully: {}", updatedTask);
            return ResponseEntity.ok(updatedTask);
        } catch (RuntimeException e) {
            logger.warn("Task not found or update failed: {}", e.getMessage());
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error updating task", e);
            return ResponseEntity.status(500).body("Error updating task: " + e.getMessage());
        }
    }

    // =========================
    // DELETE TASK
    // =========================
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id, Authentication authentication) {
        logger.info("=== [DELETE] /api/tasks/{} - deleteTask called ===", id);

        String currentUsername = authentication.getName();
        logger.info("Authenticated username: {}", currentUsername);

        User user = userService.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("User not found"));

        try {
            taskService.deleteTask(id, user);
            logger.info("Task deleted successfully with id: {}", id);
            return ResponseEntity.ok("Task deleted successfully");
        } catch (RuntimeException e) {
            logger.warn("Delete failed: {}", e.getMessage());
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error deleting task", e);
            return ResponseEntity.status(500).body("Error deleting task: " + e.getMessage());
        }
    }
}
