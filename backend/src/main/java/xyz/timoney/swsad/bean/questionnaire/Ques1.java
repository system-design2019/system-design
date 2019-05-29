package xyz.timoney.swsad.bean.questionnaire;

public class Ques1 {
    private int ID;
    private int quesID;
    private int mode;
    private String title;
    private boolean fill;

    public Ques1()
    {
        ID=0;
        quesID=0;
        mode=1;
        title="tiankong";
        fill=false;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
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

    public boolean isFill() {
        return fill;
    }

    public void setFill(boolean fill) {
        this.fill = fill;
    }
}
