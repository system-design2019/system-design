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
    boolean update(Notification notification);
    /*删除通知*/
    boolean delete(int notificationId);
    /*设置已读或未读*/
    boolean setRead(int notificationId, boolean read);

    //获取用户的所有通知
    List<Notification> getAllNotifications(int userId);
}
