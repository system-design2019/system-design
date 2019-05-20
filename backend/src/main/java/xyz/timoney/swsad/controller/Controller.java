package xyz.timoney.swsad.controller;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;
import xyz.timoney.swsad.bean.Message;

import javax.servlet.http.HttpServletResponse;

@RestController
@EnableAutoConfiguration
public class Controller {

    //如果方法上的RequestMapping没有value，则此方法默认被父路径调用
    //默认回调
    @RequestMapping
    @CrossOrigin
    private Message<String> index(HttpServletResponse httpServletResponse){
        Message<String> message = new Message<>();
        message.setSuccess(false);
        message.setMsg("请求无效");
        message.setData("APIdoc: https://documenter.getpostman.com/view/7006450/S1LzynKU?version=latest");
        return message;
    }

    @RequestMapping("/hello")
    @CrossOrigin
    private String hello(){
        return "Hello World!\n 2019-5-19 update";
    }
    //这里体现了restful风格的请求，按照请求的类型，来进行增删查改。
    //设计restful api（其实也就是URL），不要有冗余，例如不要写成getUsers，URL中
    //最好不要有动词。


}
