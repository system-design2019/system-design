package xyz.timoney.swsad.bean;

public class Ques2 {
    private int xuanID;
    private int quesID;
    private int mode;
    private String title;
    private int choose;
    private boolean fill;
    private String[] choices;

    public Ques2()
    {
        xuanID=0;
        quesID=0;
        mode=2;
        title="xuanze";
        choose=1;
        choices=new String[4];
        fill=false;
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

    public String[] getChoices() {
        return choices;
    }

    public void setChoices(String[] choices) {
        this.choices = choices;
    }
}
