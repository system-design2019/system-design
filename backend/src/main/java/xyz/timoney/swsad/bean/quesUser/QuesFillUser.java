package xyz.timoney.swsad.bean.quesUser;

//保存某个问卷填写的用户单项
public class QuesFillUser {
    //问卷ID
    private int quesId;
    //用户ID
    private int userId;


    public QuesFillUser(int quesId, int userId){
        this.quesId = quesId;
        this.userId = userId;
    }

    public int getQuesId() {
        return quesId;
    }

    public int getUserId() {
        return userId;
    }

    public void setQuesId(int quesId) {
        this.quesId = quesId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
