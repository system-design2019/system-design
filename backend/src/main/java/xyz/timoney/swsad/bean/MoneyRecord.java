package xyz.timoney.swsad.bean;

import java.util.Date;
import java.util.Objects;

public class MoneyRecord {

    /**
     * 用户ID
     */
    private int userId;
    /**
     * 用户名
     */
    private String userName;
    /**
     * 金额
     * 指闲钱币吧
     * 1 rmb = 100 timoney
     */
    private int money;
    /**
     * 交易时间
     */
    private Date date;
    /**
     * 交易信息
     */
    private String info;
    /**
     * 交易是否成功的状态
     */
    private boolean status;

    public MoneyRecord(int userId, int money, Date date, String info, boolean status){
        this.userId = userId;
        this.money = money;
        this.date = date;
        this.info = info;
        this.status = status;
    };

    public int getUserId() {
        return userId;
    }

    public Date getDate() {
        return date;
    }

    public int getMoney() {
        return money;
    }

    public String getInfo() {
        return info;
    }

    public String getUserName() {
        return userName;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public void setMoney(int money) {
        this.money = money;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
