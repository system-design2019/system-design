package xyz.timoney.swsad.bean.questionnaire;

import java.sql.Timestamp;
import java.util.Date;

//问卷专用类
public class User_temp {
    private int userID;
    private String userName;
    private Timestamp createTime;

    public User_temp()
    {
        userID=666;
        userName="doupocangqiong";
        createTime= new Timestamp(new Date().getTime());
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }
}
