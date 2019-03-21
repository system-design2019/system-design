package cn.janking.swsad.controller;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableAutoConfiguration
public class HelloController {
    @RequestMapping("/")
    private String index(){
        return "老哥，这是API接口，没有前端的哦";
    }
    @RequestMapping("/hello")
    private String hello(){
        return "Hello World!";
    }
}