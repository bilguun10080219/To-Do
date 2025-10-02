package com.todo.backend.repository;

import com.todo.backend.entity.Task;
import com.todo.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);

    Optional<Task> findByIdAndUser(Long id, User user);

    @Query("SELECT t FROM Task t WHERE t.user = :user " +
    "AND (LOWER(t.name) LIKE LOWER(CONCAT('%', :search, '%')) " +
    "OR LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Task> searchByUserAndNameOrDescription(User user, String search);
}
