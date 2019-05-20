package xyz.timoney.swsad.bean;

public class Notification {
    //消息id,数据库自动递增
    private int id;
    //消息接收方id
    private int toId;
    //消息发送方id,
    //系统消息为 0
    private int fromId;
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
        title = "不知道谁的消息";
        content = "数据初始化生成的";
    }


    public Notification(int from, int to, String title, String content){
        this.fromId = from;
        this.toId = to;
        this.title = title;
        this.content = content;
        hasRead = false;
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

}
