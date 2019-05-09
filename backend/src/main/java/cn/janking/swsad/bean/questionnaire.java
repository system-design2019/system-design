package cn.janking.swsad.bean;

import java.util.Date;
import java.util.List;

public class questionnaire {
    private int quesID;
    private String title;
    private String content;
    private String publisher;
    private int reward;
    private int attend;
    private int total;
    private String endtime;
    private String request;
    private String status;


    public questionnaire()
    {
        quesID=0;
        title="#";
        publisher="#";
        content="#";
        reward=0;
        attend=0;
        total=0;
        endtime="2019-4-28";
        request="#";
        status="not done";

    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getQuesID() {
        return quesID;
    }

    public void setQuesID(int quesID) {
        this.quesID = quesID;
    }

    public int getTotal() {
        return total;
    }


    public void setTitle(String title) {
        this.title = title;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setReward(int reward) {
        this.reward = reward;
    }

    public void setAttend(int attend) {
        this.attend = attend;
    }

    public void setEndtime(String endtime) {
        this.endtime = endtime;
    }

    public void setRequest(String request) {
        this.request = request;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public static void setCount(int count) {
        questionnaire.count = count;
    }


    public String getTitle() {
        return title;
    }

    public String getPublisher() {
        return publisher;
    }

    public String getContent() {
        return content;
    }

    public int getReward() {
        return reward;
    }

    public int getAttend() {
        return attend;
    }

    public String getEndtime() {
        return endtime;
    }

    public String getRequest() {
        return request;
    }

    public String getStatus() {
        return status;
    }

    public static int getCount() {
        return count;
    }

    private static int count = 10000;

    static public void initCount(int c){
        count = c + 10000;
    }




}
