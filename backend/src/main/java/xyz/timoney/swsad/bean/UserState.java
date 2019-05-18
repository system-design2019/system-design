package xyz.timoney.swsad.bean;

import javax.servlet.http.Cookie;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
//存储cookie类
public class UserState {
    //已认证过的用户
    public static List<UserState> list = new ArrayList<>();
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
