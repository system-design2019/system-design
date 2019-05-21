package xyz.timoney.swsad.bean.quesUser;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 保存某个问卷填写的用户单项
 */
public class QuesFillUser {
    /**
     * 缓存用户收藏的问卷ID
     */
    public static Map<Integer, List<Integer>> cacheList = new HashMap<>();
    /**
     * 问卷ID
     */
    private int quesId;
    /**
     * 用户ID
     */
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
