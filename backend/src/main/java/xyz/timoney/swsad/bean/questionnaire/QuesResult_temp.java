package xyz.timoney.swsad.bean.questionnaire;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

public class QuesResult_temp {
    private int quesID;
    private int userID;
    private Timestamp createTime;

    private String tiankong;
    private String xuanze;

    public QuesResult_temp()
    {
        quesID=0;
        userID=0;
        tiankong="#";
        xuanze="#";
        createTime= new Timestamp(new Date().getTime());
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }


    public int getQuesID() {
        return quesID;
    }

    public void setQuesID(int quesID) {
        this.quesID = quesID;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getTiankong() {
        return tiankong;
    }

    public void setTiankong(String tiankong) {
        this.tiankong = tiankong;
    }

    public String getXuanze() {
        return xuanze;
    }

    public void setXuanze(String xuanze) {
        this.xuanze = xuanze;
    }
}
