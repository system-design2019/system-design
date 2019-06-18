package xyz.timoney.swsad.bean.questionnaire;


import java.sql.Timestamp;
import java.text.ParseException;
import java.util.Date;

public class Infos {
    private int total;
    private int attend;
    // 创建问卷时间
    private Timestamp createTime;
    // 开始时间
    private Timestamp startTime;
    // 结束时间
    private Timestamp endTime;

    public Infos() throws ParseException {
        total=10;
        attend=0;
        createTime= new Timestamp(new Date().getTime());
        startTime= new Timestamp(new Date().getTime());
        endTime= new Timestamp(new Date().getTime());
    }


    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
    }

    public Date getCreateTime() {
        return createTime;
    }



    public Date getStartTime() {
        return startTime;
    }



    public Date getEndTime() {
        return endTime;
    }




    public int getAttend() {
        return attend;
    }


    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public void setAttend(int attend) {
        this.attend = attend;
    }


}
