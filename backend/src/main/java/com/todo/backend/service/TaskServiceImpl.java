package com.todo.backend.service;

import com.todo.backend.dto.TaskRequest;
import com.todo.backend.dto.TaskResponse;
import com.todo.backend.entity.Task;
import com.todo.backend.entity.User;
import com.todo.backend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public TaskResponse createTask(TaskRequest request, User user) {
        Task task = new Task();
        task.setName(request.getName());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setStatus(request.getStatus());
        task.setImageUrl(request.getImageUrl());
        task.setUser(user);

        return toResponse(taskRepository.save(task));
    }

    @Override
    public TaskResponse getTaskById(Long id, User user) {
    Task task = taskRepository.findByIdAndUser(id, user)
        .orElseThrow(() -> new RuntimeException("Task not found or not yours"));
    return toResponse(task);
}

    @Override
    public List<TaskResponse> getTasks(User user) {
        return taskRepository.findByUser(user)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskResponse> searchTasks(User user, String search) {
        return taskRepository
            .searchByUserAndNameOrDescription(user, search)
            .stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    @Override
    public TaskResponse updateTask(Long id, TaskRequest request, User user) {
        Task task = taskRepository.findById(id)
                .filter(t -> t.getUser().equals(user))
                .orElseThrow(() -> new RuntimeException("Task not found or not yours"));

        task.setName(request.getName());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setStatus(request.getStatus());
        task.setImageUrl(request.getImageUrl());

        return toResponse(taskRepository.save(task));
    }

    @Override
    public void deleteTask(Long id, User user) {
        Task task = taskRepository.findById(id)
                .filter(t -> t.getUser().equals(user))
                .orElseThrow(() -> new RuntimeException("Task not found or not yours"));
        taskRepository.delete(task);
    }

    private TaskResponse toResponse(Task task) {
        TaskResponse response = new TaskResponse();
        response.setId(task.getId());
        response.setName(task.getName());
        response.setDescription(task.getDescription());
        response.setPriority(task.getPriority());
        response.setStatus(task.getStatus());
        response.setCreatedDate(task.getCreatedDate());
        response.setCompletedDate(task.getCompletedDate());
        response.setImageUrl(task.getImageUrl());
        return response;
    }
}
