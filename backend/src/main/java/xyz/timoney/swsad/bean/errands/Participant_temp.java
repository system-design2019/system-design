package xyz.timoney.swsad.bean.errands;

import java.sql.Timestamp;
import java.util.Date;

public class Participant_temp {
    private String partName;
    private Timestamp partTime;

    public Participant_temp()
    {
        partName="zcq";
        partTime=new Timestamp(new Date().getTime());
    }

    public String getPartName() {
        return partName;
    }

    public void setPartName(String partName) {
        this.partName = partName;
    }

    public Timestamp getPartTime() {
        return partTime;
    }

    public void setPartTime(Timestamp partTime) {
        this.partTime = partTime;
    }
}
