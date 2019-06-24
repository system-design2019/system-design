package xyz.timoney.swsad.bean;

import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Util {
    /**
     * 正则表达式：验证用户名
     */
    public static final String REGEX_USERNAME = "^[a-zA-Z]\\w{5,17}$";

    /**
     * 正则表达式：验证密码
     */
    public static final String REGEX_PASSWORD = "^[a-zA-Z0-9]{6,16}$";

    /**
     * 正则表达式：验证手机号
     */
    public static final String REGEX_MOBILE = "^1(3|4|5|7|8)\\d{9}$";

    /**
     * 正则表达式：验证邮箱
     */
    public static final String REGEX_EMAIL = "[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?";

    /**
     * 正则表达式：验证汉字
     */
    public static final String REGEX_CHINESE = "^[\u4e00-\u9fa5],{0,}$";

    /**
     * 正则表达式：验证身份证
     */
    public static final String REGEX_ID_CARD = "(^\\d{18}$)|(^\\d{15}$)";

    /**
     * 正则表达式：验证URL
     */
    public static final String REGEX_URL = "http(s)?://([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&=]*)?";

    /**
     * 正则表达式：验证IP地址
     */
    public static final String REGEX_IP_ADDR = "(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)";
    /**文件传输**/
    public static ResponseEntity<FileSystemResource> export(File file) {
        if (file == null) {
            return null;
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Content-Disposition", "attachment; filename=" + System.currentTimeMillis() + ".doc");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");
        headers.add("Last-Modified", new Date().toString());
        headers.add("ETag", String.valueOf(System.currentTimeMillis()));

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentLength(file.length())
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(new FileSystemResource(file));
    }
    /**
     * 生成随机文件名：当前年月日时分秒+五位随机数
     */
    public static String getRandomFileName() {

        SimpleDateFormat simpleDateFormat;

        simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");

        Date date = new Date();

        String str = simpleDateFormat.format(date);

        Random random = new Random();

        int rannum = (int) (random.nextDouble() * (99999 - 10000 + 1)) + 10000;// 获取5位随机数

        return rannum + str;// 当前时间
    }
    /**
     * 生成随机码
     * 去掉uuid的-符号
     */
    public static String getUUID(){
        String uuid = UUID.randomUUID().toString();
        return uuid.replace("-","");
    }

    /**
     * 验证手机号
     * */
    public static boolean validPhone(String phone){
        Pattern p = Pattern.compile(REGEX_MOBILE);
        Matcher m = p.matcher(phone);
        return m.matches();

    }

    /**
     * 验证邮箱
     * */
    public static boolean validEmail(String email){
        Pattern regex = Pattern.compile(REGEX_EMAIL);
        Matcher matcher = regex.matcher(email);
        return matcher.matches();
    }

    /**
     * long转date
     * */
    public static String longToDate(long milliseconds){
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(milliseconds);
        return calendar.getTime().toString();
    }
    public static long getCurrentDateLong(){
        // 使用Calendar获取当前系统时间，需要获取Calendar对象后转换成Date输出
        Calendar calendar = Calendar.getInstance();
        // 这个方法相当于Date中的getTime，获取当前时间的毫秒数
        return calendar.getTimeInMillis();
    }
}
