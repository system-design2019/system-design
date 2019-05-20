package xyz.timoney.swsad.bean;

public class Ques1 {
    private int mode;
    private String title;
    private boolean fill;

    public Ques1()
    {
        mode=1;
        title="xuanzeti";
        fill=false;
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
