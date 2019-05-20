package xyz.timoney.swsad;

import xyz.timoney.swsad.bean.Notification;
import xyz.timoney.swsad.controller.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SwsadApplication {

    public static void main(String[] args) {
        Object[] objects = new Object[]{
                Controller.class,
                UserController.class,
                QuestionnaireController.class,
                NotificationController.class,
                VerifyCodeController.class};

        SpringApplication.run(objects, args);
    }

}
