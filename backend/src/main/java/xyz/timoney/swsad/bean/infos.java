package xyz.timoney.swsad.bean;

public class infos {
    private int total;
    private int attend;
    private String startTime;
    private String endTime;

    public infos(){
        total=0;
        attend=0;
        startTime="2019-5-19";
        endTime="2019-5-20";
    }

    public int getTotal() {
        return total;
    }

    public int getAttend() {
        return attend;
    }

    public String getStartTime() {
        return startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public void setAttend(int attend) {
        this.attend = attend;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
}
