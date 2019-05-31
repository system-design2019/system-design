package xyz.timoney.swsad.bean;

//返回消息统一格式
public class Message<T> {
    //是否成功的标志
    boolean success;
    //其他消息
    String msg;
    //具体数据
    T data;
    public Message(){
        success = false;
        msg = "";
        data = null;
    }

    public String getMsg() {
        return msg;
    }

    public T getData() {
        return data;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setData(T data) {
        this.data = data;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    @Override
    public String toString() {
        String s = "\n--------Message-------" +
                "\nSuccess: " + success +
                "\nMessage: " + msg;
        if(data!=null )
            s += "\nData: " + data.toString();
        s += "\n--------Message-------";
        return s;
    }
}
