package xyz.timoney.swsad.bean.questionnaire;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.format.annotation.DateTimeFormat;
import xyz.timoney.swsad.bean.questionnaire.Infos;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Questionnaire {
    /**
     * 缓存用户发布的问卷ID
     */
    public static Map<Integer, List<Integer>> cacheListId = new HashMap<>();
    /**
     * 缓存用户发布的问卷
     */
    public static Map<Integer, List<Questionnaire>> cacheList = new HashMap<>();
    private int quesID;
    private String title;
    private String detail;
    private int publisher;
    private int reward;
    public Infos Infos;
    private String command;
    private String status;
    private int number;
    private List<Ques1> tians;
    private List<Ques2> xuans;



    public Questionnaire() throws ParseException {
        quesID=0;
        title="#";
        publisher=0;
        detail="#";
        reward=0;
        Infos = new Infos();
        command="#";
        status="not done";
        number=2;
        tians = new ArrayList<Ques1>();
        xuans = new ArrayList<Ques2>();
    }

    public int getPublisher() {
        return publisher;
    }

    public void setPublisher(int publisher) {
        this.publisher = publisher;
    }

    public List<Ques1> getTians() {
        return tians;
    }

    public void setTians(List<Ques1> tians) {
        this.tians = tians;
    }

    public List<Ques2> getXuans() {
        return xuans;
    }

    public void setXuans(List<Ques2> xuans) {
        this.xuans = xuans;
    }


    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }


    public Infos getInfos() {
        return Infos;
    }

    public void setInfos(Infos infos) {
        Infos = infos;
    }

    public void setQuesID(int quesID) {
        this.quesID = quesID;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }



    public void setReward(int reward) {
        this.reward = reward;
    }


    public void setCommand(String command) {
        this.command = command;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getQuesID() {
        return quesID;
    }

    public String getTitle() {
        return title;
    }

    public String getDetail() {
        return detail;
    }



    public int getReward() {
        return reward;
    }



    public String getCommand() {
        return command;
    }

    public String getStatus() {
        return status;
    }
}
