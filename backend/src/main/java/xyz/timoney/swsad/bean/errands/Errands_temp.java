package xyz.timoney.swsad.bean.errands;

import java.sql.Timestamp;
import java.util.Date;

public class Errands_temp {
    private int errandsID;
    private boolean status;
    private String title;
    private Timestamp time;
    private String place;
    private String event;
    private int publisher;
    private String publisherName;
    private int reward;
    private int deposit;
    private int total;
    private int attend;

    public Errands_temp()
    {
        errandsID=0;
        status=false;
        title="houduanquantui";
        time=new Timestamp(new Date().getTime());
        place="tushuguan";
        event="bangwodadaima";
        publisher=0;
        publisherName="zcq";
        reward=0;
        deposit=0;
        total=0;
        attend=0;
    }

    public int getPublisher() {
        return publisher;
    }

    public void setPublisher(int publisher) {
        this.publisher = publisher;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public int getErrandsID() {
        return errandsID;
    }

    public void setErrandsID(int errandsID) {
        this.errandsID = errandsID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public String getPublisherName() {
        return publisherName;
    }

    public void setPublisherName(String publisherName) {
        this.publisherName = publisherName;
    }

    public int getReward() {
        return reward;
    }

    public void setReward(int reward) {
        this.reward = reward;
    }

    public int getDeposit() {
        return deposit;
    }

    public void setDeposit(int deposit) {
        this.deposit = deposit;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getAttend() {
        return attend;
    }

    public void setAttend(int attend) {
        this.attend = attend;
    }
}
