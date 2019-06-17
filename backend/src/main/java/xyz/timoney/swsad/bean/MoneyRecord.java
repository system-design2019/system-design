package xyz.timoney.swsad.bean;

import java.util.Date;

public class MoneyRecord {
    private int userId;
    private String userName;
    private double money;
    private Date time;
    private String info;
    private int payType;

    public int getUserId() {
        return userId;
    }

    public Date getTime() {
        return time;
    }

    public double getMoney() {
        return money;
    }

    public int getPayType() {
        return payType;
    }

    public String getInfo() {
        return info;
    }

    public String getUserName() {
        return userName;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public void setMoney(double money) {
        this.money = money;
    }

    public void setPayType(int payType) {
        this.payType = payType;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
