package xyz.timoney.swsad.service;

import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.dm.model.v20151123.SingleSendMailRequest;
import com.aliyuncs.dm.model.v20151123.SingleSendMailResponse;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import org.springframework.core.io.ClassPathResource;
import java.io.*;
import java.util.HashMap;
import java.util.Random;
import java.util.Scanner;

public class Email {

    private static HashMap<String, String> EmailCode = new HashMap<>();
    /**
     * 邮件模板：
     * 0 注册
     * 1 找回密码*/
    private static final String[] EmailTemplate = {"static/mail_register_template.html", "static/mail_forget_password_template.html"};
    private static final String[] EmailTitle = {"【TIM挣闲钱】注册邮箱验证","【TIM挣闲钱】找回密码邮箱验证"};
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

    public static boolean sendEmail(String address, int type){
        // 如果是除杭州region外的其它region（如新加坡、澳洲Region），需要将下面的"cn-hangzhou"替换为"ap-southeast-1"、或"ap-southeast-2"。
        IClientProfile profile = DefaultProfile.getProfile("cn-hangzhou", accessKeyId, secret);
        IAcsClient client = new DefaultAcsClient(profile);
        SingleSendMailRequest request = new SingleSendMailRequest();
        //使用https
        request.setProtocol(com.aliyuncs.http.ProtocolType.HTTPS);
        //生成随机6位验证码
        String code = String.format("%06d",new Random().nextInt(1000000));
        EmailCode.put(address, code);
        try {
            //request.setVersion("2017-06-22");// 如果是除杭州region外的其它region（如新加坡region）,必须指定为2017-06-22
            request.setAccountName("no-reply@timoney.xyz");
            request.setFromAlias("TimeIsMoney");
            request.setAddressType(1);
            //request.setTagName("控制台创建的标签");
            request.setReplyToAddress(true);
            request.setToAddress(address);
            //可以给多个收件人发送邮件，收件人之间用逗号分开，批量发信建议使用BatchSendMailRequest方式
            //request.setToAddress("邮箱1,邮箱2");
            //未处理越界问题
            request.setSubject(EmailTitle[type]);
            ClassPathResource mailTemplate = new ClassPathResource(EmailTemplate[type]);
            System.out.println(mailTemplate);
            Scanner scanner = new Scanner(mailTemplate.getInputStream());
            String htmlBody = "";
            while (scanner.hasNextLine()){
                 htmlBody += scanner.nextLine() + System.getProperty("line.separator");
            }
            htmlBody = htmlBody.replace("[address]", address).replace("[code]", code);
            request.setHtmlBody(htmlBody);

            //System.out.println(htmlBody);
/*            BufferedReader reader = new BufferedReader(new StringReader(htmlBody));
            PrintWriter writer = new PrintWriter(new FileWriter("C:\\Users\\Janking\\Desktop\\out.html"));
            {
                reader.lines().forEach(line -> writer.println(line));
            }
            writer.close();*/
            scanner.close();
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
