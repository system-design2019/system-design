package cn.janking.swsad;

import cn.janking.swsad.controller.Controller;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SwsadApplication {

    public static void main(String[] args) {
        SpringApplication.run(Controller.class, args);
    }

}
