package io.github.iamrushier.jobconnect_backend.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "file")
public class FileStorageProperties {
    private String uploadDir;
}
