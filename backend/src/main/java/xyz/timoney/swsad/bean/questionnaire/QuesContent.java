package xyz.timoney.swsad.bean.questionnaire;

import java.util.ArrayList;
import java.util.List;

public class QuesContent {
    private int quesID;
    private String title;
    private int number;

    private List<Ques1> ques1;
    private List<Ques2> ques2;

    public QuesContent()
    {
        quesID=0;
        title="wenti";
        //最少要有两个问题
        number=2;
        ques1= new ArrayList<>();
        ques2= new ArrayList<>();
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

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public List<Ques1> getQues1() {
        return ques1;
    }

    public void setQues1(List<Ques1> ques1) {
        this.ques1 = ques1;
    }

    public List<Ques2> getQues2() {
        return ques2;
    }

    public void setQues2(List<Ques2> ques2) {
        this.ques2 = ques2;
    }
}
