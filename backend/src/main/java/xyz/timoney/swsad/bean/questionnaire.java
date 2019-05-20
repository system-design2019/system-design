package xyz.timoney.swsad.bean;
import xyz.timoney.swsad.bean.infos;
public class questionnaire {
    private int quesID;
    private String title;
    private String detail;
    private String publisher;
    private int reward;
    private infos Infos;
    private String command;
    private String status;


    public questionnaire()
    {
        quesID=0;
        title="#";
        publisher="#";
        detail="#";
        reward=0;
        Infos = new infos();
        command="#";
        status="not done";

    }

    public infos getInfos() {
        return Infos;
    }

    public void setInfos(infos infos) {
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

    public void setPublisher(String publisher) {
        this.publisher = publisher;
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

    public String getPublisher() {
        return publisher;
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
