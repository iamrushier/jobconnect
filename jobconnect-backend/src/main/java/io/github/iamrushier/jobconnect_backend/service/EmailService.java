package io.github.iamrushier.jobconnect_backend.service;

public interface EmailService {
    void sendEmail(String to, String subject, String text);
}
