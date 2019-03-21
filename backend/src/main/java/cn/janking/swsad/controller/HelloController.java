package cn.janking.swsad.controller;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableAutoConfiguration
public class HelloController {
    @RequestMapping("/")
    private String index(){
        return "老哥，这是API接口，我又不会写前端，访问我干啥";
    }
    @RequestMapping("/hello")
    private String hello(){
        return "Hello World!";
    }
}