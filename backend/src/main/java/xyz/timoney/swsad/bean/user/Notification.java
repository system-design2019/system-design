package xyz.timoney.swsad.bean.user;
import xyz.timoney.swsad.bean.Util;

import java.util.*;

public class Notification {
    //缓存用户的通知
    public static Map<Integer,List<Notification>> cacheList = new HashMap<>();
    //消息id,数据库自动递增
    private int id;
    //消息接收方id
    private int toId;
    //消息发送方id,
    //系统消息为 0
    //其实用这个就可以代替type了，还能显示是谁发送的
    //后续也可以添加-1表示问卷消息，-2表示跑腿消息
    private int fromId;

    /**
     * 发送通知的用户名
     */
    private String fromName;
    //消息时间
    private Date date;
    //已读 true
    //未读 false
    private boolean hasRead;
    //消息标题
    private String title;
    //消息内容
    private String content;

    public Notification(){
        fromId = 0;
        toId = 0;
        hasRead = false;
        date = new Date(Util.getCurrentDateLong());
        title = "不知道谁的消息";
        content = "数据初始化生成的";
    }


    public Notification(int from, int to, String title, String content){
        this.fromId = from;
        this.toId = to;
        this.title = title;
        this.content = content;
        hasRead = false;
        date = new Date(Util.getCurrentDateLong());
    }
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getToId() {
        return toId;
    }

    public void setToId(int toId) {
        this.toId = toId;
    }

    public int getFromId() {
        return fromId;
    }

    public void setFromId(int fromId) {
        this.fromId = fromId;
    }

    public void setHasRead(boolean hasRead) {
        this.hasRead = hasRead;
    }

    public boolean isHasRead() {
        return hasRead;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getFromName() {
        return fromName;
    }

    public void setFromName(String fromName) {
        this.fromName = fromName;
    }
}
