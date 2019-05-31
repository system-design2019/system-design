package xyz.timoney.swsad.bean.questionnaire;

import java.util.ArrayList;
import java.util.List;
public class QuesResult {
    //联合主键
    private int quesID;
    private int userID;

    private List<String> tiankong;
    private List<Integer> xuanze;

    public QuesResult()
    {
        quesID=0;
        userID=0;
        tiankong=new ArrayList<String>();
        xuanze=new ArrayList<Integer>();
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

    public List<Integer> getXuanze() {
        return xuanze;
    }

    public void setXuanze(List<Integer> xuanze) {
        this.xuanze = xuanze;
    }
}
