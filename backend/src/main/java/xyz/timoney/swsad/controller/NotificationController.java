package xyz.timoney.swsad.controller;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;
import xyz.timoney.swsad.bean.Message;
import xyz.timoney.swsad.bean.user.Notification;
import xyz.timoney.swsad.bean.user.UserState;
import xyz.timoney.swsad.mapper.NotificationMapper;
import xyz.timoney.swsad.singleton.SingletonMybatis;

import java.util.Comparator;
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
     * 获取用户所有通知
     */
    @RequestMapping(method = RequestMethod.GET, value = "/notifications/all")
    @CrossOrigin
    public Message<List<Notification>> getAllNotification(@CookieValue("user") String userCookieKey) {
        System.out.println("\nGET /notifications/all\n");
        Message<List<Notification>> message = new Message<>();
        int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        //先查询缓存
        if(Notification.cacheList.containsKey(userId)){
            //返回
            message.setSuccess(true);
            message.setData(Notification.cacheList.get(userId));
            message.setMsg("已获取" + message.getData().size() + "条通知: 来自缓存");
            return message;
        }
        List<Notification> list;
        //获取一个连接,自动提交
        try (SqlSession sqlSession = sqlSessionFactory.openSession(true)) {
            //得到映射器
            NotificationMapper notificationMapper = sqlSession.getMapper(NotificationMapper.class);
            //调用接口中的方法去执行xml文件中的SQL语句
            list = notificationMapper.getAllNotifications(userId);
            message.setData(list);
        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("获取通知失败: 出现异常");
            System.out.println(message);
            return message;
        }
        //最后记得关闭连接
        //同步到缓存
        Notification.cacheList.put(userId, list);
        //返回
        message.setSuccess(true);
        message.setMsg("已获取" + list.size() + "条通知: 来自数据库");
        System.out.println(message);
        return message;
    }


    /**
     * 添加新通知
     * 可以批操作
     */
    @RequestMapping(method = RequestMethod.POST, value = "/notifications")
    @CrossOrigin
    public Message<String> sendNotification(@CookieValue("user") String userCookieKey, @RequestBody List<Notification> notifications) {
        System.out.println("\nPOST /notifications\n");
        Message<String> message = new Message<>();
        //这个userId是发送方的
        int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        int successCount = 0;
        for(Notification notification : notifications){
            if(userId != notification.getFromId()){
                message.setData("部分通知无权发送");
                continue;
            }
            //获取一个连接,自动提交
            try (SqlSession sqlSession = sqlSessionFactory.openSession(true)) {
                //得到映射器
                NotificationMapper notificationMapper = sqlSession.getMapper(NotificationMapper.class);
                //调用接口中的方法去执行xml文件中的SQL语句
                notificationMapper.insert(notification);
            } catch (Exception e) {
                e.printStackTrace();
                message.setSuccess(false);
                message.setMsg("发送通知失败: 出现异常");
                System.out.println(message);
                return message;
            }
            //最后记得关闭连接
            successCount++;
        }
        //同步通知发送到缓存中的用户
        for(Notification newNotification: notifications){
            if(newNotification.getFromId() == userId){
                if(Notification.cacheList.containsKey(newNotification.getToId())){
                    Notification.cacheList.get(newNotification.getToId()).add(newNotification);
                    //重新排列，预想降序排列
                    Notification.cacheList.get(newNotification.getToId()).sort(Comparator.comparing(Notification::getDate));
                }
            }
        }
        if(successCount < notifications.size()){
            message.setSuccess(false);
            message.setMsg("通知发送成功条数: " + successCount);
        }else {
            message.setSuccess(true);
            message.setMsg("通知全部发送成功");
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
        System.out.println("\nDELETE /notifications\n");
        Message<String> message = new Message<>();
        int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        int successCount = 0;
        for(Notification notification : notifications){
            if(userId != notification.getToId()){
                message.setData("部分通知无权删除");
                continue;
            }
            //获取一个连接,自动提交
            try (SqlSession sqlSession = sqlSessionFactory.openSession(true)) {
                //得到映射器
                NotificationMapper notificationMapper = sqlSession.getMapper(NotificationMapper.class);
                //删除给定ID通知
                notificationMapper.delete(notification.getId());
            } catch (Exception e) {
                e.printStackTrace();
                message.setSuccess(false);
                message.setMsg("删除通知失败: 出现异常");
                System.out.println(message);
                return message;
            }
            //最后记得关闭连接
            successCount++;
        }
        //同步删除缓存中数据
        if(Notification.cacheList.containsKey(userId)){
            for(Notification deleteNotice : notifications){
                Notification.cacheList.get(userId).removeIf(originNotice ->
                        (originNotice.getToId()==userId)&&(originNotice.getId()==deleteNotice.getId()));
            }
        }
        if(successCount < notifications.size()){
            message.setSuccess(false);
            message.setMsg("删除成功条数: " + successCount);
        }else {
            message.setSuccess(true);
            message.setMsg("删除操作全部成功");
        }
        System.out.println(message);
        return message;
    }
    /**
     * 删除所有通知
     */
    @RequestMapping(method = RequestMethod.DELETE, value = "/notifications/all")
    @CrossOrigin
    public Message<String> deleteAllNotification(@CookieValue("user") String userCookieKey) {
        System.out.println("\nDELETE /notifications/all\n");
        Message<String> message = new Message<>();
        int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        //获取一个连接,自动提交
        try (SqlSession sqlSession = sqlSessionFactory.openSession(true)) {
            //得到映射器
            NotificationMapper notificationMapper = sqlSession.getMapper(NotificationMapper.class);
            //删除所有通知
            notificationMapper.deleteAll(userId);
        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("删除通知失败: 出现异常");
            System.out.println(message);
            return message;
        }
        //最后记得关闭连接
        //同步清空缓存中通知
        if(Notification.cacheList.containsKey(userId)){
            Notification.cacheList.get(userId).clear();
        }
        message.setSuccess(true);
        message.setMsg("已删除所有通知");
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
        System.out.println("\nPUT /notifications\n");
        Message<String> message = new Message<>();
        int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        int successCount = 0;
        for(Notification notification : notifications){
            if(userId != notification.getToId()){
                message.setData("部分通知无权修改状态");
                continue;
            }
            //获取一个连接,自动提交
            try (SqlSession sqlSession = sqlSessionFactory.openSession(true)) {
                //得到映射器
                NotificationMapper notificationMapper = sqlSession.getMapper(NotificationMapper.class);
                //修改通知的已读未读状态，仅此而已
                notificationMapper.setRead(notification.getId(), notification.isHasRead());
            } catch (Exception e) {
                e.printStackTrace();
                message.setSuccess(false);
                message.setMsg("更新通知失败: 出现异常");
                System.out.println(message);
                return message;
            }
            //最后记得关闭连接
            successCount++;
        }
        //同步修改缓存中数据
        if(Notification.cacheList.containsKey(userId)){
            for(Notification newNotification : notifications){
                if(newNotification.getToId()!=userId){
                    message.setData("某些通知无权修改状态");
                    continue;
                }
                for(Notification originNotice : Notification.cacheList.get(userId)){
                    if(originNotice.getId() == newNotification.getId()){
                        originNotice.setHasRead(newNotification.isHasRead());
                    }
                }
            }
        }
        if(successCount < notifications.size()){
            message.setSuccess(false);
            message.setMsg("更新成功条数: " + successCount);
        }else {
            message.setSuccess(true);
            message.setMsg("更新操作全部成功");
        }
        System.out.println(message);
        return message;
    }

    /**
     * 设置全部通知为已读/未读
     */
    @RequestMapping(method = RequestMethod.PUT, value = "/notifications/all/{read}")
    @CrossOrigin
    public Message<String> readAllNotification(@CookieValue("user") String userCookieKey,@PathVariable("read") boolean hasRead) {
        System.out.println("\nPUT /notifications/all  " + hasRead + "\n");
        Message<String> message = new Message<>();
        int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        //获取一个连接,自动提交
        try (SqlSession sqlSession = sqlSessionFactory.openSession(true)) {
            //得到映射器
            NotificationMapper notificationMapper = sqlSession.getMapper(NotificationMapper.class);
            //修改通知的已读未读状态，仅此而已
            if (hasRead) {
                notificationMapper.setReadAllTrue(userId);
            } else {
                notificationMapper.setReadAllFalse(userId);
            }
        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("更新通知失败: 出现异常");
            System.out.println(message);
            return message;
        }
        //最后记得关闭连接
        //同步修改缓存中数据
        if(Notification.cacheList.containsKey(userId)){
             for(Notification originNotice : Notification.cacheList.get(userId)){
                 originNotice.setHasRead(hasRead);
             }
        }
        message.setSuccess(true);
        message.setMsg("已将所有通知设为" + (hasRead?"已读":"未读"));
        System.out.println(message);
        return message;
    }


}