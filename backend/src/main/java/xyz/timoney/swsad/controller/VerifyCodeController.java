package xyz.timoney.swsad.controller;

import javafx.scene.paint.PhongMaterial;
import org.omg.PortableInterceptor.SYSTEM_EXCEPTION;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;
import xyz.timoney.swsad.bean.Code;
import xyz.timoney.swsad.bean.Message;
import xyz.timoney.swsad.bean.Util;
import xyz.timoney.swsad.service.Email;
import xyz.timoney.swsad.service.SMS;

import java.rmi.server.ExportException;

@RestController
@EnableAutoConfiguration
public class VerifyCodeController {

    @RequestMapping(method = RequestMethod.POST,value = "/code")
    @CrossOrigin
    private Message<String> sendCode(@RequestBody Code code){
        System.out.println("\nPOST /code\n");
        Message<String> message = new Message<>();
        if(code==null){
            message.setSuccess(false);
            message.setMsg("发送验证码失败: 参数为空");
            System.out.println(message);
            return message;
        }
        System.out.println(code.getPhone_or_email());
        System.out.println(code.getTarget());
        System.out.println(code.getType());
        if(code.getType() != 0 && code.getType() != 1){
            message.setSuccess(false);
            message.setMsg("发送验证码失败: 非有效验证情况");
            System.out.println(message);
            return message;
        }
        try {
            switch (code.getPhone_or_email()){
                //表示 手机接收验证码
                case 0:
                    if(Util.validPhone(code.getTarget())){
                        SMS.sendSMSMessage(code.getTarget(), code.getType());
                    }else {
                        message.setSuccess(false);
                        message.setMsg("发送验证码失败: 手机号无效");
                        System.out.println(message);
                        return message;
                    }
                    break;
                //表示 邮箱接收验证码
                case 1:
                    if(Util.validEmail(code.getTarget())){
                        Email.sendEmail(code.getTarget(),code.getType());
                    }else {
                        message.setSuccess(false);
                        message.setMsg("发送验证码失败: 邮箱地址无效");
                        System.out.println(message);
                        return message;
                    }
                    break;
                default:
                    message.setSuccess(false);
                    message.setMsg("发送验证码失败: 非有效验证方式");
                    System.out.println(message);
                    return message;
            }
        }catch (Exception e){
            message.setSuccess(false);
            message.setMsg("发送验证码失败: 出现异常");
            message.setData(e.toString());
            System.out.println(message);
            return message;
        }
        message.setSuccess(true);
        message.setMsg("发送验证码成功");
        return message;
    }

    @RequestMapping(method = RequestMethod.POST,value = "/code/verify")
    @CrossOrigin
    private Message<String> verifyCode(@RequestBody Code code){
        System.out.println("\nPOST /code/verify\n");
        Message<String> message = new Message<>();
        Boolean result = false;
        if(code==null){
            message.setSuccess(false);
            message.setMsg("检查验证码失败: 参数为空");
            System.out.println(message);
            return message;
        }
        try {
            switch (code.getPhone_or_email()){
                //表示 手机
                case 0:
                    if(Util.validPhone(code.getTarget()))
                        result = SMS.verifyCode(code.getTarget(), code.getCode());
                    else {
                        message.setSuccess(false);
                        message.setMsg("检查验证码失败: 手机号无效");
                        System.out.println(message);
                        return message;
                    }
                    break;
                //表示 邮箱
                case 1:
                    if(Util.validEmail(code.getTarget()))
                        result = Email.verifyCode(code.getTarget(),code.getCode());
                    else {
                        message.setSuccess(false);
                        message.setMsg("检查验证码失败: 手机号无效");
                        System.out.println(message);
                        return message;
                    }
                    break;
            }
        }catch (Exception e){
            message.setSuccess(false);
            message.setMsg("检查验证码失败: 出现异常");
            message.setData(e.toString());
            System.out.println(message);
            return message;
        }
        if(result){
            message.setSuccess(true);
            message.setMsg("验证码正确");
        }else{
            message.setSuccess(false);
            message.setMsg("验证码错误");
        }
        return message;
    }


}
