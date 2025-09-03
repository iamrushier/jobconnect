package io.github.iamrushier.jobconnect_backend.config;

import io.github.iamrushier.jobconnect_backend.dto.application.ApplicationResponse;
import io.github.iamrushier.jobconnect_backend.model.Application;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Explicit mapping for Application → ApplicationResponse
        modelMapper.typeMap(Application.class, ApplicationResponse.class)
                .addMapping(src -> src.getResume().getFilename(), ApplicationResponse::setResumeFilename)
                .addMapping(src -> src.getUser().getId(), ApplicationResponse::setUserId)
                .addMapping(src -> src.getUser().getUsername(), ApplicationResponse::setUsername)
                .addMapping(src -> src.getJob().getId(), ApplicationResponse::setJobId)
                .addMapping(src -> src.getJob().getTitle(), ApplicationResponse::setJobTitle);

        return modelMapper;
    }
}
