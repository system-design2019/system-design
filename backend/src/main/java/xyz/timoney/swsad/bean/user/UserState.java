package xyz.timoney.swsad.bean.user;

import xyz.timoney.swsad.bean.Message;
import xyz.timoney.swsad.bean.Util;

import java.util.ArrayList;
import java.util.List;
//存储cookie类
public class UserState {
    //已认证过的用户
    public static List<UserState> cookieList = new ArrayList<>();
    public static <T>  int verifyCookie (String userCookieKey, Message<T> message){
        if(message == null)
            message = new Message<>();
        if(userCookieKey==null || userCookieKey.isEmpty()){
            message.setSuccess(false);
            message.setMsg("cookie为空");
            System.out.println(message);
            return -1;
        }
        System.out.println("--------Request-------");
        System.out.println(userCookieKey);
        System.out.println("--------Request-------");
        for(UserState us : cookieList){
            if(us.getCookieKey().equals(userCookieKey)){
                System.out.println("--------Verify-------");
                System.out.println(us);
                System.out.println("--------Verify-------");
                if(us.getValidTime() >= System.currentTimeMillis()){
                    //时间有效
                    message.setSuccess(true);
                    message.setMsg("身份校验成功");
                    System.out.println(message);
                    return us.getId();
                }else {
                    //时间无效
                    message.setSuccess(false);
                    message.setMsg("cookie已过期");
                    System.out.println(message);
                    return -1;
                }
            }
        }
        message.setSuccess(false);
        message.setMsg("cookie无效");
        System.out.println(message);
        return -1;
    }

    private int id;
    private String cookieKey;
    private long validTime;

    public UserState(int id, String cookieKey, Long time){
        this.id = id;
        this.cookieKey = cookieKey;
        this.validTime= time;
    }

    public int getId() {
        return id;
    }
    public void setId(int id){
        this.id = id;
    }

    public String getCookieKey() {
        return cookieKey;
    }

    public void setCookieKey(String cookieKey) {
        this.cookieKey = cookieKey;
    }

    public long getValidTime() {
        return validTime;
    }

    public void setValidTime(long validTime) {
        this.validTime = validTime;
    }

    @Override
    public String toString() {
        String result = "id: " + id;
        result += "\ncookieKey: " + cookieKey;
        result += "\nvalidTime: " + validTime;
        result += "\ntoDate: " + Util.longToDate(validTime);
        return result;
    }
}
