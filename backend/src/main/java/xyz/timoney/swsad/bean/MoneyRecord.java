package xyz.timoney.swsad.bean;

import org.codehaus.groovy.util.HashCodeHelper;

import java.util.*;

public class MoneyRecord {
    public static Map<String, MoneyRecord> confirmLinkMap = new HashMap<>();

    /**
     * 自动生成的记录id
     */
    private int id;
    /**
     * 用户ID
     */
    private int userId;
    /**
     * 金额
     * 指闲钱币
     * 1 rmb = 100 timoney
     * 正数表示余额增加：如充值，填问卷
     * 负数表示余额减少：如提现，发问卷
     */
    private int money;
    /**
     * 交易时间
     */
    private Date date;

    /**
     * 支付方式
     * -1 :无需此项，也就是一般闲钱币的交易
     * 0：微信
     * 1：支付宝
     */
    private int payType;
    /**
     * 交易信息
     * 一般闲钱币交易会提示"填写某问卷',"发布某问卷"等信息
     * 充值或者提现是用户手动填写的备注，方便管理员确认，不然即使受到了转账也不好迅速确认是否是某个用户
     * 所以前端在充值或提现时要加一个用户填写备注的地方
     */
    private String info;
    /**
     * 交易是否成功的状态
     * 主要是充值或者提现会有一个确认的过程，确认成功才会为true
     */
    private boolean status;

    public MoneyRecord(){
        userId = -1;
        money = 0;
        date = new Date(Util.getCurrentDateLong());
        info = "";
        status = false;
        payType = -1;
    }

    public MoneyRecord(int userId, int money, Date date, String info, boolean status){
        this.userId = userId;
        this.money = money;
        this.date = date;
        this.info = info;
        this.status = status;
        payType = -1;
    }

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


    public void setStatus(boolean status) {
        this.status = status;
    }


    public boolean isStatus() {
        return status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPayType() {
        return payType;
    }

    public void setPayType(int payType) {
        this.payType = payType;
    }
}
