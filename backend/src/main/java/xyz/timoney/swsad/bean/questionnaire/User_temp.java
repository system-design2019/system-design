package xyz.timoney.swsad.bean.questionnaire;

//问卷专用类
public class User_temp {
    private int userID;
    private String userName;

    public User_temp()
    {
        userID=666;
        userName="doupocangqiong";
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
}
