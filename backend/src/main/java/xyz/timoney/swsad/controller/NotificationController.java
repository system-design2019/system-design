package xyz.timoney.swsad.controller;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;
import xyz.timoney.swsad.bean.Message;
import xyz.timoney.swsad.bean.Notification;
import xyz.timoney.swsad.bean.User;
import xyz.timoney.swsad.bean.UserState;
import xyz.timoney.swsad.mapper.NotificationMapper;
import xyz.timoney.swsad.singleton.SingletonMybatis;
import java.util.List;

@RestController
@EnableAutoConfiguration
public class NotificationController {

    private static SqlSessionFactory sqlSessionFactory;

    static {
        sqlSessionFactory = SingletonMybatis.getSqlSessionFactory();
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        try {
            //得到映射器
            NotificationMapper notificationMapper = sqlSession.getMapper(NotificationMapper.class);
            //初始化表
            notificationMapper.notificationTableInit();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 添加新通知
     * 可以批操作
     */
    @RequestMapping(method = RequestMethod.POST, value = "/notifications")
    @CrossOrigin
    public Message<String> sendNotification(@CookieValue("user") String userCookieKey, @RequestBody List<Notification> notifications) {
        System.out.println("\nPOST /notification\n");
        Message<String> message = new Message<>();
        int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        int successCount = 0;
        for(Notification notification : notifications){
            if(userId != notification.getFromId()){
                continue;
            }
            //获取一个连接,自动提交
            SqlSession sqlSession = sqlSessionFactory.openSession(true);
            try {
                //得到映射器
                NotificationMapper notificationMapper= sqlSession.getMapper(NotificationMapper.class);
                //调用接口中的方法去执行xml文件中的SQL语句
                notificationMapper.insert(notification);
            } catch (Exception e) {
                e.printStackTrace();
                message.setSuccess(false);
                message.setMsg("发送通知失败: 出现异常");
                System.out.println(message);
                return message;
            } finally {
                //最后记得关闭连接
                sqlSession.close();
            }
            successCount++;
        }
        //同步修改缓存中数据
        for(User user : User.cacheList){
            if(user.getId() == userId){
                for(Notification newNotice : notifications){
                    if(newNotice.getToId()!=userId){
                        message.setData("某些通知无权发送");
                        continue;
                    }

                    user.getNotifications().add(newNotice);
                }
            }
        }
        if(successCount < notifications.size()){
            message.setSuccess(false);
            message.setMsg("发送成功条数: " + successCount);
        }else {
            message.setSuccess(true);
            message.setMsg("全部发送成功");
        }
        System.out.println(message);
        return message;
    }

    /**
     * 删除通知
     * 可以批操作
     */
    @RequestMapping(method = RequestMethod.DELETE, value = "/notifications")
    @CrossOrigin
    public Message<String> deleteNotification(@CookieValue("user") String userCookieKey, @RequestBody List<Notification> notifications) {
        System.out.println("\nDELETE /notification/send\n");
        Message<String> message = new Message<>();
        int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        int successCount = 0;
        for(Notification notification : notifications){
            if(userId != notification.getToId()){
                continue;
            }
            //获取一个连接,自动提交
            SqlSession sqlSession = sqlSessionFactory.openSession(true);
            try {
                //得到映射器
                NotificationMapper notificationMapper= sqlSession.getMapper(NotificationMapper.class);
                //删除给定ID通知
                notificationMapper.delete(notification.getId());
            } catch (Exception e) {
                e.printStackTrace();
                message.setSuccess(false);
                message.setMsg("删除通知失败: 出现异常");
                System.out.println(message);
                return message;
            } finally {
                //最后记得关闭连接
                sqlSession.close();
            }
            successCount++;
        }
        //同步修改缓存中数据
        for(User user : User.cacheList){
            if(user.getId() == userId){
                for(Notification deleteNotice : notifications){
                    user.getNotifications().removeIf(originNotice ->
                            (originNotice.getToId()==userId)&&(originNotice.getId()==deleteNotice.getId()));
                }
            }
        }
        if(successCount < notifications.size()){
            message.setSuccess(false);
            message.setMsg("删除成功条数: " + successCount);
        }else {
            message.setSuccess(true);
            message.setMsg("全部删除成功");
        }
        System.out.println(message);
        return message;
    }

    /**
     * 设置已读未读通知
     * 可以批操作
     */
    @RequestMapping(method = RequestMethod.PUT, value = "/notifications")
    @CrossOrigin
    public Message<String> readNotification(@CookieValue("user") String userCookieKey, @RequestBody List<Notification> notifications) {
        System.out.println("\nPUT /notification\n");
        Message<String> message = new Message<>();
        int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        int successCount = 0;
        for(Notification notification : notifications){
            if(userId != notification.getToId()){
                continue;
            }
            //获取一个连接,自动提交
            SqlSession sqlSession = sqlSessionFactory.openSession(true);
            try {
                //得到映射器
                NotificationMapper notificationMapper= sqlSession.getMapper(NotificationMapper.class);
                //修改通知的已读未读状态，仅此而已
                notificationMapper.setRead(notification.getId(), notification.isHasRead());
            } catch (Exception e) {
                e.printStackTrace();
                message.setSuccess(false);
                message.setMsg("更新通知失败: 出现异常");
                System.out.println(message);
                return message;
            } finally {
                //最后记得关闭连接
                sqlSession.close();
            }
            successCount++;
        }
        //同步修改缓存中数据
        for(User user : User.cacheList){
            if(user.getId() == userId){
                for(Notification newNotice : notifications){
                    if(newNotice.getToId()!=userId){
                        message.setData("某些通知无权修改状态");
                        continue;
                    }
                    for(Notification originNotice : user.getNotifications()){
                        if(originNotice.getId() == newNotice.getId())
                            originNotice.setHasRead(newNotice.isHasRead());
                    }
                }
            }
        }
        if(successCount < notifications.size()){
            message.setSuccess(false);
            message.setMsg("更新成功条数: " + successCount);
        }else {
            message.setSuccess(true);
            message.setMsg("全部更新成功");
        }
        System.out.println(message);
        return message;
    }
}