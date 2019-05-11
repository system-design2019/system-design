package cn.janking.swsad;

import cn.janking.swsad.bean.User;
import cn.janking.swsad.controller.Controller;
import cn.janking.swsad.controller.QuestionnaireController;
import cn.janking.swsad.controller.UserController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import sun.text.normalizer.NormalizerBase;

@SpringBootApplication
public class SwsadApplication {

    public static void main(String[] args) {
        Object[] objects = new Object[]{
                Controller.class,
                UserController.class,
                QuestionnaireController.class};

        SpringApplication.run(objects, args);
    }

}
