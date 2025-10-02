package com.todo.backend.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dkkfujpt1",
                "api_key", "295276695977738",
                "api_secret", "40GmZSJyJUVtTDm1sYLWwWowK5I",
                "secure", true
                ));
    }
}
