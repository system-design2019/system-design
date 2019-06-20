package xyz.timoney.swsad.bean.questionnaire;
import com.fasterxml.jackson.annotation.JsonProperty;
import xyz.timoney.swsad.bean.questionnaire.Infos;

import java.text.ParseException;

//获取正在进行的问卷
public class Questionnaire_temp {
    private int quesID;
    private String title;
    private String detail;
    private int publisher;
    private String publisherName;
    private int reward;
    public Infos Infos;
    private String command;
    private String status;
    private int number;

    public Questionnaire_temp() throws ParseException {
        quesID=0;
        title="#";
        publisher=0;
        publisherName="zheng";
        detail="#";
        reward=0;
        Infos = new Infos();
        command="#";
        status="not done";
        number=2;
    }

    public int getPublisher() {
        return publisher;
    }

    public void setPublisher(int publisher) {
        this.publisher = publisher;
    }

    public int getQuesID() {
        return quesID;
    }

    public void setQuesID(int quesID) {
        this.quesID = quesID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getPublisherName() {
        return publisherName;
    }

    public void setPublisherName(String publisherName) {
        this.publisherName = publisherName;
    }

    public int getReward() {
        return reward;
    }

    public void setReward(int reward) {
        this.reward = reward;
    }

    @JsonProperty("Infos")
    public Infos getInfos() {
        return Infos;
    }

    public void setInfos(Infos infos) {
        Infos = infos;
    }

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }
}
