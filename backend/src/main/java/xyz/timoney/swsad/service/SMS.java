package xyz.timoney.swsad.service;

import com.aliyuncs.CommonRequest;
import com.aliyuncs.CommonResponse;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.http.ProtocolType;
import com.aliyuncs.profile.DefaultProfile;
import com.mysql.jdbc.jdbc2.optional.SuspendableXAConnection;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.util.HashMap;
import java.util.Random;
import java.util.Scanner;

public class SMS {
    private static HashMap<String,String> SMSCode = new HashMap<>();
    //  0:注册
    //  1:忘记密码
    private static final String[] SMSTemplate = {"SMS_165380907","SMS_165415364"};
    private static final String accessKeyId;
    private static final String secret;
    /**
     * 初始化获取私钥
     * */
    static {
        ClassPathResource smsKey = new ClassPathResource("privateKey/SMSKey.txt");
        System.out.println(smsKey);
        Scanner scanner = null;
        try {
            scanner = new Scanner(smsKey.getInputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
        accessKeyId = scanner.nextLine();
        secret = scanner.nextLine();
        scanner.close();
    }

    /**发送短信服务*/
    //type表示类型:
    public static void sendSMSMessage(String phoneNum, int type) throws Exception{
        DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", accessKeyId, secret);
        IAcsClient client = new DefaultAcsClient(profile);
        //生成随机6位验证码
        String code = String.format("%06d",new Random().nextInt(1000000));
        SMSCode.put(phoneNum,code);
        CommonRequest request = new CommonRequest();
        request.setProtocol(ProtocolType.HTTPS);
        request.setMethod(MethodType.POST);
        request.setDomain("dysmsapi.aliyuncs.com");
        request.setVersion("2017-05-25");
        request.setAction("SendSms");
        request.putQueryParameter("RegionId", "cn-hangzhou");
        request.putQueryParameter("SignName", "TimeIsMoney");
        //未处理越界问题
        request.putQueryParameter("TemplateCode", SMSTemplate[type]);
        request.putQueryParameter("PhoneNumbers", phoneNum);
        request.putQueryParameter("TemplateParam", "{\"code\":\"" + code + "\"}");
        //可能会抛出异常
        CommonResponse response = client.getCommonResponse(request);
        System.out.println(response.getHttpStatus());
    }
    /**
     * 检查验证码是否正确
     * */
    public static boolean verifyCode(String phoneNum, String code){
        if(code.equals(SMSCode.getOrDefault(phoneNum,null)))
            return true;
        return false;
    }
}
