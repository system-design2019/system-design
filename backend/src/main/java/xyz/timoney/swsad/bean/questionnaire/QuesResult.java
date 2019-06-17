package xyz.timoney.swsad.bean.questionnaire;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
public class QuesResult {
    //联合主键
    private int quesID;
    private int userID;
    private Timestamp createTime;

    private List<String> tiankong;
    private List<String> xuanze;

    public QuesResult()
    {
        quesID=0;
        userID=0;
        tiankong=new ArrayList<String>();
        xuanze=new ArrayList<String>();
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

    public List<String> getTiankong() {
        return tiankong;
    }

    public void setTiankong(List<String> tiankong) {
        this.tiankong = tiankong;
    }

    public List<String> getXuanze() {
        return xuanze;
    }

    public void setXuanze(List<String> xuanze) {
        this.xuanze = xuanze;
    }
}
