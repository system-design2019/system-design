package xyz.timoney.swsad.bean.errands;

import java.sql.Timestamp;
import java.util.Date;

public class Participant {
    private int userID;
    private Timestamp partTime;

    public Participant()
    {
        userID=12;
        partTime=new Timestamp(new Date().getTime());
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public Timestamp getPartTime() {
        return partTime;
    }

    public void setPartTime(Timestamp partTime) {
        this.partTime = partTime;
    }
}
