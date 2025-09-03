package io.github.iamrushier.jobconnect_backend.repository;

import io.github.iamrushier.jobconnect_backend.model.Application;
import io.github.iamrushier.jobconnect_backend.model.Job;
import io.github.iamrushier.jobconnect_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByUser(User user);

    List<Application> findByJob(Job job);

    boolean existsByUser(User user);
}
