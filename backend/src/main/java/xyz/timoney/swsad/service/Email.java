package xyz.timoney.swsad.service;

import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.dm.model.v20151123.SingleSendMailRequest;
import com.aliyuncs.dm.model.v20151123.SingleSendMailResponse;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import xyz.timoney.swsad.bean.user.User;

import java.io.*;
import java.util.HashMap;
import java.util.Random;
import java.util.Scanner;

public class Email {

    private static HashMap<String, String> EmailCode = new HashMap<>();
    /**
     * 邮件模板：
     * 0 注册
     * 1 找回密码
     * 2 充值
     * 3 提现
     * */
    private static final String[] EmailTemplate = {"static/mail_register_template.html",
            "static/mail_forget_password_template.html",
            "mail_recharge_confirm.html"};
    private static final String[] EmailTitle = {"【TIM挣闲钱】注册邮箱验证",
            "【TIM挣闲钱】找回密码邮箱验证",
            "【TIM挣闲钱】用户充值确认"};
    private static final String accessKeyId;
    private static final String secret;
    /**
     * 初始化获取私钥
     * */
    static {
        ClassPathResource mailKey = new ClassPathResource("privateKey/EmailKey.txt");
        System.out.println(mailKey);
        Scanner scanner = null;
        try {
            scanner = new Scanner(mailKey.getInputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
        accessKeyId = scanner.nextLine();
        secret = scanner.nextLine();
        scanner.close();
    }


    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    /**
     * 发送有关账户金额确认邮件
     * user 用户对象
     * payType 支付宝还是微信
     * payTime 付款时间
     * money 付款金额
     * info 留言信息
     */
    @Async
    public boolean sendRechargeConfirmMail(User user, int payType, String payTime, double money, String info) {
        String content;
        try {
            //设置变量
            Context context = new Context();
            context.setVariable("userId",user.getId());
            context.setVariable("userName",user.getName());
            context.setVariable("money",money);
            context.setVariable("time",payTime);
            context.setVariable("info",info);
            context.setVariable("payType",payType);
            //链接
            context.setVariable("passUrl","https://baidu.com");
            context.setVariable("backUrl","https://baidu.com");
            //获取模板html代码
            content = templateEngine.process(EmailTemplate[2], context);
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
        return doSendEmail(user.getEmail(), EmailTitle[2],content);
    }

    /**
     * 发送邮件
     */
    public static boolean sendEmail(String address, int type){

        //生成随机6位验证码
        String code = String.format("%06d",new Random().nextInt(1000000));
        EmailCode.put(address, code);

        String title = EmailTitle[type];

        ClassPathResource mailTemplate = new ClassPathResource(EmailTemplate[type]);
        System.out.println(mailTemplate);
        Scanner scanner = null;
        try {
            scanner = new Scanner(mailTemplate.getInputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
        String htmlBody = "";
        while (scanner.hasNextLine()){
            htmlBody += scanner.nextLine() + System.getProperty("line.separator");
        }
        htmlBody = htmlBody.replace("[address]", address).replace("[code]", code);
        scanner.close();

        return doSendEmail(address, title, htmlBody);
    }

    /**
     * 真正发送邮件
     *
     */
    public static boolean doSendEmail(String address, String title, String content){
        // 如果是除杭州region外的其它region（如新加坡、澳洲Region），需要将下面的"cn-hangzhou"替换为"ap-southeast-1"、或"ap-southeast-2"。
        IClientProfile profile = DefaultProfile.getProfile("cn-hangzhou", accessKeyId, secret);
        IAcsClient client = new DefaultAcsClient(profile);
        SingleSendMailRequest request = new SingleSendMailRequest();
        //使用https
        request.setProtocol(com.aliyuncs.http.ProtocolType.HTTPS);
        try {
            //request.setVersion("2017-06-22");// 如果是除杭州region外的其它region（如新加坡region）,必须指定为2017-06-22
            request.setAccountName("no-reply@service.timoney.xyz");
            request.setFromAlias("TimeIsMoney");
            request.setAddressType(1);
            request.setReplyToAddress(true);
            request.setToAddress(address);
            //可以给多个收件人发送邮件，收件人之间用逗号分开，批量发信建议使用BatchSendMailRequest方式
            //request.setToAddress("邮箱1,邮箱2");
            //未处理越界问题
            request.setSubject(title);
            request.setHtmlBody(content);
            SingleSendMailResponse httpResponse = client.getAcsResponse(request);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    /**
     * 检查验证码是否正确
     * */
    public static boolean verifyCode(String address, String code){
        if(code.equals(EmailCode.getOrDefault(address,null)))
            return true;
        return false;
    }

}
