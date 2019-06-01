package xyz.timoney.swsad.bean.questionnaire;

import java.util.ArrayList;
import java.util.List;

public class Ques2 {
    private int xuanID;
    private int quesID;
    private int theorder;
    private int mode;
    private String title;
    private int choose;
    private boolean fill;
    private List<String> choices;

    public Ques2()
    {
        xuanID=0;
        quesID=0;
        theorder=0;
        mode=2;
        title="xuanze";
        choose=1;
        choices= new ArrayList<>();
        fill=false;
    }

    public int getTheorder() {
        return theorder;
    }

    public void setTheorder(int theorder) {
        this.theorder = theorder;
    }

    public int getXuanID() {
        return xuanID;
    }

    public void setXuanID(int xuanID) {
        this.xuanID = xuanID;
    }

    public int getQuesID() {
        return quesID;
    }

    public void setQuesID(int quesID) {
        this.quesID = quesID;
    }

    public int getMode() {
        return mode;
    }

    public void setMode(int mode) {
        this.mode = mode;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getChoose() {
        return choose;
    }

    public void setChoose(int choose) {
        this.choose = choose;
    }

    public boolean isFill() {
        return fill;
    }

    public void setFill(boolean fill) {
        this.fill = fill;
    }

    public List<String> getChoices() {
        return choices;
    }

    public void setChoices(List<String> choices) {
        this.choices = choices;
    }
}
