package io.github.iamrushier.jobconnect_backend.util;

import io.github.iamrushier.jobconnect_backend.model.Job;
import io.github.iamrushier.jobconnect_backend.model.User;

public class EmailTemplateUtil {

    public static String buildJobApplicationEmail(User user, Job job) {
        return String.format("Dear %s,\n\nThank you for applying for the position of %s at %s.\n\nWe have received your application and will review it shortly.\n\nBest regards,\nThe JobConnect Team",
                user.getUsername(), job.getTitle(), job.getEmployer().getUsername());
    }
}
