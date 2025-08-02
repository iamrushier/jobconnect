package io.github.iamrushier.jobconnect_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class JobconnectBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(JobconnectBackendApplication.class, args);
	}

}
