package io.github.iamrushier.jobconnect_backend.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.tags.Tag;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"))
                .components(new Components().addSecuritySchemes("Bearer Authentication", createAPIKeyScheme()))
                .info(new Info().title("JobConnect API")
                        .description("API for JobConnect application.")
                        .version("1.0"))
                .servers(List.of(new Server().url("http:localhost:8080").description("local"),
                        new Server().url("http:localhost:8085").description("live")))
                .tags(List.of(
                        new Tag().name("Authentication APIs"),
                        new Tag().name("Job APIs"),
                        new Tag().name("Job search APIs"),
                        new Tag().name("Resume APIs"),
                        new Tag().name("Job Application APIs"),
                        new Tag().name("Admin APIs")
                ));
    }

    private SecurityScheme createAPIKeyScheme() {
        return new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .bearerFormat("JWT")
                .scheme("bearer");
    }
}
