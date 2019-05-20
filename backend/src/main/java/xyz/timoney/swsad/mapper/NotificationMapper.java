package xyz.timoney.swsad.mapper;

import xyz.timoney.swsad.bean.Notification;

import java.util.List;

public interface NotificationMapper {
    /*新建表格*/
    void notificationTableInit();
    /*删除表格*/
    void notificationTableDrop();
    /*添加通知*/
    int insert(Notification notification);
    /*修改通知*/
    int update(Notification notification);
    /*删除通知*/
    int delete(int notificationId);
    /*删除所有通知*/
    int deleteAll(int toId);
    /*设置已读或未读*/
    int setRead(int notificationId, boolean read);
    /*全部设置已读*/
    int setReadAllTrue(int toId);
    /*全部设置未读*/
    int setReadAllFalse(int toId);

    //获取用户的所有通知
    List<Notification> getAllNotifications(int userId);
}
