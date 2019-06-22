package xyz.timoney.swsad.controller;

import org.apache.tomcat.util.http.fileupload.util.LimitedInputStream;
import org.springframework.util.StringUtils;
import xyz.timoney.swsad.bean.*;
import xyz.timoney.swsad.bean.quesUser.QuesCollectUser;
import xyz.timoney.swsad.bean.quesUser.QuesFillUser;
import xyz.timoney.swsad.bean.questionnaire.Questionnaire;
import xyz.timoney.swsad.bean.user.Notification;
import xyz.timoney.swsad.bean.user.User;
import xyz.timoney.swsad.bean.user.UserState;
import xyz.timoney.swsad.mapper.*;
import xyz.timoney.swsad.service.JwtHelper;
import xyz.timoney.swsad.singleton.SingletonMybatis;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.jws.soap.SOAPBinding;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.*;


@RestController
@EnableAutoConfiguration
public class UserController {

    private static SqlSessionFactory sqlSessionFactory;
    static {
        sqlSessionFactory =  SingletonMybatis.getSqlSessionFactory();
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        try {
            //得到映射器
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            //初始化用户表
            userMapper.userTableInit();
            //用户数量
            int count = userMapper.getCount();
            User.initCount(count);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    /**
     * 重置用户表
     * */
/*  @RequestMapping(method = RequestMethod.DELETE,value = "/users/all")
    @CrossOrigin
    public Message<String> usersTableInit(){
        System.out.println("\nDELETE /users/all\n");
        Message<String> message = new Message<>();
        //获取一个连接,自动提交
        try (SqlSession sqlSession = sqlSessionFactory.openSession(true)) {
            //得到映射器
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            //调用接口中的方法去执行xml文件中的SQL语句
            userMapper.userTableDrop();
            userMapper.userTableInit();
        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("重置失败: 出现异常");
            System.out.println(message);
            return message;
        }
        //最后记得关闭连接
        message.setSuccess(true);
        message.setMsg("用户表重置成功");
        System.out.println(message);
        return message;
    }*/
    /**
     * 获取所有用户
     * */
    @RequestMapping(method = RequestMethod.GET,value = "/users")
    @CrossOrigin
    public Message<List<User>> getUsers(){
        System.out.println("\nGET /users\n");
        Message<List<User>> message = new Message<>();
        List<User> listUsers;
        //获取一个连接
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            //得到映射器
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            //调用接口中的方法去执行xml文件中的SQL语句
            listUsers = userMapper.getUsers();
            message.setData(listUsers);
            message.setSuccess(true);
            message.setMsg("获取成功");
            //要提交后才会生效
            sqlSession.commit();
        } catch (Exception e) {
            message.setData(null);
            message.setSuccess(false);
            message.setMsg("获取失败: 出现异常");
        }
        //最后记得关闭连接
        System.out.println(message);
        return message;
    }

    /**
     * 注册：插入用户数据
     * 成功返回true
     * 用户名存在返回false
     * */
    @RequestMapping(method = RequestMethod.POST,value = "/register")
    @CrossOrigin
    public Message<String> register(@RequestBody User user){
        System.out.println("\nPOST /register\n");
        Message<String> message = new Message<>();
        if(user==null){
            message.setSuccess(false);
            message.setMsg("注册失败: 参数为空");
            System.out.println(message);
            return message;
        }
        System.out.println("--------Request-------");
        System.out.println(user);
        System.out.println("--------Request-------");

        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            NotificationMapper notificationMapper = sqlSession.getMapper(NotificationMapper.class);
            //只允许注册一个手机号或邮箱号
            User insertUser = new User();
            if(User.isInit(user.getEmail())){
                if(Util.validEmail(user.getEmail())){
                    insertUser.setEmail(user.getEmail());
                }else {
                    message.setSuccess(false);
                    message.setMsg("注册失败: 邮箱无效");
                    System.out.println(message);
                    return message;
                }
            }else if(User.isInit(user.getPhone())){
                if(Util.validPhone(user.getPhone())){
                    insertUser.setPhone(user.getPhone());
                }else {
                    message.setSuccess(false);
                    message.setMsg("注册失败: 手机号无效");
                    System.out.println(message);
                    return message;
                }
            }else {
                message.setSuccess(false);
                message.setMsg("注册失败: 手机号和邮箱必须要填一个");
                System.out.println(message);
                return message;
            }
            if(StringUtils.isEmpty(user.getPassword())){
                message.setSuccess(false);
                message.setMsg("注册失败: 密码必须要填写");
                System.out.println(message);
                return message;
            }
            insertUser.setPassword(user.getPassword());
            userMapper.insert(insertUser);
            int userId = insertUser.getId();
            System.out.println(userId);
            notificationMapper.insert(new Notification(0, userId, "注册后第一条通知", "感谢注册TimeIsMoney，有问题尽管联系我们哦"));
            notificationMapper.insert(new Notification(0, userId, "注册后第二条通知", "请尽快实名认证哦"));
            message.setSuccess(true);
            message.setMsg("注册成功");
            sqlSession.commit();
        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            //不能直接e instanceof ...
            if (e.getCause() instanceof com.mysql.jdbc.exceptions.jdbc4.MySQLIntegrityConstraintViolationException) {
                message.setMsg("注册失败: 账号已存在");
            } else {
                message.setMsg("注册失败: 出现异常");
            }
            System.out.println(message);
            return message;
        }
        System.out.println(message);
        return message;
    }
    /**
     * 登录：判断用户名和密码是否一致
     * 一致返回cookie凭证
     * 同时返回用户id
     * 不一致返回null
     * */
    @RequestMapping(method = RequestMethod.POST,value = "/login")
    @CrossOrigin
    public Message<String> login(HttpServletRequest request, HttpServletResponse response, @RequestBody User loginUser){
        System.out.println("\nPOST /login\n");
        Message<String> message = new Message<>();
        if(loginUser==null){
            message.setSuccess(false);
            message.setMsg("登录失败: 参数为空");
            System.out.println(message);
            return message;
        }
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        //判断是手机还是邮箱
        System.out.println("--------Request-------");
        System.out.println(loginUser);
        System.out.println("--------Request-------");
        User user;
        //手机号登录
        if(loginUser.getPhone() != null && !loginUser.getPhone().isEmpty() && loginUser.getPhone().charAt(0) != '$'){
            try {
                UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
                user = userMapper.getByPhone(loginUser.getPhone());
            }catch (Exception e){
                e.printStackTrace();
                message.setSuccess(false);
                message.setMsg("登录失败: 出现异常");
                System.out.println(message);
                return message;
            }finally {
                sqlSession.close();
            }
        }
        else if(loginUser.getEmail() != null && !loginUser.getEmail().isEmpty() && loginUser.getEmail().charAt(0) != '$'){
            try {
                UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
                user = userMapper.getByEmail(loginUser.getEmail());
            }catch (Exception e){
                e.printStackTrace();
                message.setSuccess(false);
                message.setMsg("登录失败: 出现异常" );
                System.out.println(message);
                return message;
            }finally {
                sqlSession.close();
            }
        }else{
            message.setMsg("登录失败：邮箱或手机为空");
            message.setSuccess(false);
            message.setData(null);
            System.out.println(message);
            return message;
        }
        System.out.println("--------Verify-------");
        System.out.println(user);
        System.out.println("--------Verify-------");
        //判断用户是否存在
        if(user == null){
            message.setMsg("登录失败：账号不存在");
            message.setSuccess(false);
            message.setData(null);
            System.out.println(message);
            return message;
        }else {
            //判断密码是否正确
            if(user.getPassword().equals(loginUser.getPassword())){
                message.setMsg("登录成功");
                message.setSuccess(true);
                //返回用户id
                message.setData(String.valueOf(user.getId()));
                //添加token
                //message.setData(JwtHelper.createJWT(String.valueOf(user.getId())));
                //随机生成cookie
                String cookieKey = Util.getUUID();
                Cookie cookie = new Cookie("user", cookieKey);
                //有效期一天
                UserState userState = new UserState(user.getId(), cookieKey, Util.getCurrentDateLong() + 24*60*60*1000);
                UserState.cookieList.add(userState);
                cookie.setMaxAge(80000);
                cookie.setPath("/");
                //cookie.setDomain(".timoney.xyz");
                //跨域问题
                //response.setHeader("Access-Control-Allow-Origin", "localhost");
                response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since");
                response.setHeader("Access-Control-Expose-Headers", "Set-Cookie");
                response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
                //这个是要前端设置
                //response.addHeader("Access-Control-Allow-Credentials", "true");

                response.addCookie(cookie);
                //测试使用
                //response.addHeader("User",cookieKey);
                System.out.println("cookies:" + cookie.getValue());
                return message;
            }
            message.setMsg("登录失败：用户名或密码错误");
            message.setSuccess(false);
            message.setData(null);
            System.out.println(message);
            return message;
        }

    }


    /**
     * 使用cookie
     * 获取用户信息，需要有cookie认证
     * */
    @RequestMapping(method = RequestMethod.GET,value = "/user")
    @CrossOrigin
    public Message<User> getUser(@CookieValue("user") String userCookieKey){
        System.out.println("\nGET /user\n");
        Message<User> message = new Message<>();
        final int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        //先看缓存中是否有
        for(User u : User.cacheList){
            if(u.getId() == userId){
                message.setSuccess(false);
                message.setMsg("获取用户信息成功: 来自缓存");
                message.setData(u);
                System.out.println(message);
                return message;
            }
        }
        User user;
        //时间有效
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            QuestionnaireMapper questionnaireMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            QuesFillUserMapper quesFillUserMapper = sqlSession.getMapper(QuesFillUserMapper.class);
            QuesCollectUserMapper quesCollectUserMapper = sqlSession.getMapper(QuesCollectUserMapper.class);
            //获取用户基本信息
            user = userMapper.getById(userId);
            //用户不存在
            if(user ==null){
                message.setSuccess(false);
                message.setMsg("获取用户信息失败: 该用户不存在");
                System.out.println(message);
                return message;
            }
            /**
            * 获取发布问卷列表,按时间逆序
            *//*
            List<Questionnaire> publishedList = questionnaireMapper.getAllPublished(userId);
            *//**
             * 获取填写问卷列表
             *//*
            List<Integer> quesFilledIdList = quesFillUserMapper.getAllFilledId(userId);
            List<Questionnaire> quesFilledList = new ArrayList<>();
            for (int i : quesFilledIdList) {
                quesFilledList.add(questionnaireMapper.getQuesByID(i));
            }
            //还不知道排序情况，预想降序排列
            quesFilledList.sort((o1, o2) -> -o1.getInfos().getStartTime().compareTo(o2.getInfos().getStartTime()));
            *//**
             * 获取收藏问卷列表
             * *//*
            List<Integer> quesCollectedIdList = quesCollectUserMapper.getAllCollectedId(userId);
            List<Questionnaire> quesCollectedList = new ArrayList<>();
            for (int i : quesCollectedIdList) {
                quesCollectedList.add(questionnaireMapper.getQuesByID(i));
            }
            //还不知道排序情况，预想降序排列
            quesCollectedList.sort((o1, o2) -> -o1.getInfos().getStartTime().compareTo(o2.getInfos().getStartTime()));
            *//**
             * 设置为用户属性，并且缓存
             * *//*
            user.setPublished(publishedList);
            user.setFilled(quesFilledList);
            user.setCollected(quesCollectedList);*/
            //加到缓存中去，避免每次都查询数据库
            User.cacheList.add(user);
            //一次性提交
            sqlSession.commit();
        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("获取用户信息失败: 出现异常");
            System.out.println(message);
            return message;
        }
        message.setSuccess(false);
        message.setMsg("获取用户信息成功: 来自数据库");
        message.setData(user);
        System.out.println(message);
        return message;
    }


    /**
     * 使用token
     * 获取用户信息，需要有token认证
     * */
    /*@RequestMapping(method = RequestMethod.GET,value = "/user/token")
    @CrossOrigin
    public Message<User> getUserByToken(HttpServletRequest request){
        System.out.println("\nGET /user/token\n");
        Message<User> message = new Message<>();
        //得到请求头信息authorization信息
        //去掉bearer
        final String authHeader = request.getHeader("Authorization").substring(7);
        int userId = Integer.parseInt(JwtHelper.parseJWT(authHeader, message));
        if(!message.isSuccess()){
            return message;
        }

        //先看缓存中是否有
        for(User u : User.cacheList){
            if(u.getId() == userId){
                message.setSuccess(false);
                message.setMsg("获取用户信息成功: 来自缓存");
                message.setData(u);
                System.out.println(message);
                return message;
            }
        }
        User user;
        //时间有效
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            QuestionnaireMapper questionnaireMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            QuesFillUserMapper quesFillUserMapper = sqlSession.getMapper(QuesFillUserMapper.class);
            QuesCollectUserMapper quesCollectUserMapper = sqlSession.getMapper(QuesCollectUserMapper.class);
            //获取用户基本信息
            user = userMapper.getById(userId);
            //用户不存在
            if(user ==null){
                message.setSuccess(false);
                message.setMsg("获取用户信息失败: 该用户不存在");
                System.out.println(message);
                return message;
            }
            //加到缓存中去，避免每次都查询数据库
            User.cacheList.add(user);
            //一次性提交
            sqlSession.commit();
        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("获取用户信息失败: 出现异常");
            System.out.println(message);
            return message;
        }
            message.setSuccess(false);
            message.setMsg("获取用户信息成功: 来自数据库");
            message.setData(user);
            System.out.println(message);
            return message;
    }*/


    /**
     * @param userCookieKey 用户cookie
     * @return 用户发布的所有问卷
     */
    @RequestMapping(method = RequestMethod.GET, value = "/user/publish/all")
    @CrossOrigin
    public Message<List<Questionnaire>> getUserAllPublishQuestionnaire(@CookieValue("user") String userCookieKey){
        System.out.println("\nGET /user/publish/all\n");
        Message<List<Questionnaire>> message = new Message<>();
        final int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        //先看缓存中是否有
        if(Questionnaire.cacheList.containsKey(userId)){
            message.setSuccess(false);
            message.setMsg("获取用户全部发布问卷成功: 来自缓存");
            message.setData(Questionnaire.cacheList.get(userId));
            System.out.println(message);
            return message;
        }
        List<Questionnaire> publishedList;
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            QuestionnaireMapper questionnaireMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            //获取用户基本信息
            User user = userMapper.getById(userId);
            //用户不存在
            if(user ==null){
                message.setSuccess(false);
                message.setMsg("获取用户全部发布问卷失败: 该用户不存在");
                System.out.println(message);
                return message;
            }
            /**
             * 获取发布问卷列表,按时间逆序
             */
            List<Integer> publishedIdList = questionnaireMapper.getAllPublishedId(userId);
            publishedList = questionnaireMapper.getAllPublished(userId);
            //添加Info
            for(Questionnaire q : publishedList){
                q.setInfos(questionnaireMapper.getInfo(q.getQuesID()));
            }
            //把ID和问卷都
            // 加到缓存中去，避免每次都查询数据库
            Questionnaire.cacheList.put(userId, publishedList);
            Questionnaire.cacheListId.put(userId, publishedIdList);
            //一次性提交
            sqlSession.commit();
        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("获取用户全部发布问卷失败: 出现异常");
            System.out.println(message);
            return message;
        }
        message.setSuccess(false);
        message.setMsg("获取用户全部发布问卷成功: 来自数据库");
        message.setData(publishedList);
        System.out.println(message);
        return message;
    }

    /**
     * @param userCookieKey 用户cookie
     * @return 用户填写的所有问卷
     */
    @RequestMapping(method = RequestMethod.GET, value = "/user/fill/all")
    @CrossOrigin
    public Message<List<Questionnaire>> getUserAllFillQuestionnaire(@CookieValue("user") String userCookieKey){
        System.out.println("\nGET /user/fill/all\n");
        Message<List<Questionnaire>> message = new Message<>();
        final int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        //先看缓存中是否有
        if(QuesFillUser.cacheList.containsKey(userId)){
            message.setSuccess(false);
            message.setMsg("获取用户全部填写问卷成功: 来自缓存");
            message.setData(QuesFillUser.cacheList.get(userId));
            System.out.println(message);
            return message;
        }
        List<Questionnaire> quesFilledList;
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            QuesFillUserMapper quesFillUserMapper = sqlSession.getMapper(QuesFillUserMapper.class);
            QuestionnaireMapper questionnaireMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            //获取用户基本信息
            User user = userMapper.getById(userId);
            //用户不存在
            if(user ==null){
                message.setSuccess(false);
                message.setMsg("获取用户全部填写问卷失败: 该用户不存在");
                System.out.println(message);
                return message;
            }
            /**
             * 获取填写问卷列表,按时间逆序
             */
            //获取填写问卷列表
            List<Integer> quesFilledIdList = quesFillUserMapper.getAllFilledId(userId);
            quesFilledList = new ArrayList<>();
            for (int i : quesFilledIdList) {
                Questionnaire q = questionnaireMapper.getQuesByID(i);
                //如果这个问卷不存在，那就去掉它
                if(q == null){
                    continue;
                }
                q.setInfos(questionnaireMapper.getInfo(i));
                quesFilledList.add(q);
            }
            //还不知道排序情况，预想降序排列
            quesFilledList.sort((o1, o2) -> -o1.getInfos().getStartTime().compareTo(o2.getInfos().getStartTime()));
            //把id和问卷都
            //加到缓存中去，避免每次都查询数据库
            QuesFillUser.cacheList.put(userId,quesFilledList);
            QuesFillUser.cacheListId.put(userId,quesFilledIdList);
            //一次性提交
            sqlSession.commit();
        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("获取用户全部填写问卷失败: 出现异常");
            System.out.println(message);
            return message;
        }
        message.setSuccess(false);
        message.setMsg("获取用户全部填写问卷成功: 来自数据库");
        message.setData(quesFilledList);
        System.out.println(message);
        return message;
    }

    /**
     * @param userCookieKey 用户cookie
     * @return 用户收藏的所有问卷
     */
    @RequestMapping(method = RequestMethod.GET, value = "/user/collect/all")
    @CrossOrigin
    public Message<List<Questionnaire>> getUserAllCollectQuestionnaire(@CookieValue("user") String userCookieKey){
        System.out.println("\nGET /user/collect/all\n");
        Message<List<Questionnaire>> message = new Message<>();
        final int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        //先看缓存中是否有
        if(QuesCollectUser.cacheList.containsKey(userId)){
            message.setSuccess(false);
            message.setMsg("获取用户全部收藏问卷成功: 来自缓存");
            message.setData(QuesCollectUser.cacheList.get(userId));
            System.out.println(message);
            return message;
        }
        List<Questionnaire> quesCollectedList;
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            QuesCollectUserMapper quesCollectUserMapper = sqlSession.getMapper(QuesCollectUserMapper.class);
            QuestionnaireMapper questionnaireMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            //获取用户基本信息
            User user = userMapper.getById(userId);
            //用户不存在
            if(user ==null){
                message.setSuccess(false);
                message.setMsg("获取用户全部收藏问卷失败: 该用户不存在");
                System.out.println(message);
                return message;
            }
            /**
             * 获取收藏问卷列表,按时间逆序
             */
            //获取收藏问卷列表
            List<Integer> quesCollectedIdList = quesCollectUserMapper.getAllCollectedId(userId);
            quesCollectedList = new ArrayList<>();
            for (int i : quesCollectedIdList) {
                Questionnaire q = questionnaireMapper.getQuesByID(i);
                //如果这个问卷不存在，那就去掉它
                if(q == null){
                    continue;
                }
                q.setInfos(questionnaireMapper.getInfo(i));
                quesCollectedList.add(q);
            }
            //还不知道排序情况，预想降序排列
            quesCollectedList.sort((o1, o2) -> -o1.getInfos().getStartTime().compareTo(o2.getInfos().getStartTime()));
            //把id和问卷都
            //加到缓存中去，避免每次都查询数据库
            QuesCollectUser.cacheList.put(userId, quesCollectedList);
            QuesCollectUser.cacheListId.put(userId, quesCollectedIdList);
            //一次性提交
            sqlSession.commit();
        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("获取用户全部收藏问卷失败: 出现异常");
            System.out.println(message);
            return message;
        }
        message.setSuccess(false);
        message.setMsg("获取用户全部收藏问卷成功: 来自数据库");
        message.setData(quesCollectedList);
        System.out.println(message);
        return message;
    }

    /**
     * 更新用户数据
     * */
    @RequestMapping(method = RequestMethod.PUT,value = "/user")
    @CrossOrigin
    public Message<String> updateUser(@CookieValue("user") String userCookieKey, @RequestBody User modifyUser){
        System.out.println("\nPUT /user\n");
        Message<String> message = new Message<>();
        if(modifyUser==null){
            message.setSuccess(false);
            message.setMsg("更新用户信息失败: 参数为空");
            System.out.println(message);
            return message;
        }
        int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        if(userId != modifyUser.getId()){
            message.setMsg("更新用户信息失败: Cookie不一致");
            return message;
        }
        //判断face链接长度
        if(modifyUser.getFace().length() > 199){
            message.setSuccess(false);
            message.setMsg("更新用户信息失败: 头像链接过长");
            return message;
        }

        //自动提交
        //时间有效
        try (SqlSession sqlSession = sqlSessionFactory.openSession(true)) {
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            int result = userMapper.updateUser(modifyUser);
            if (result > 0) {
                message.setSuccess(true);
                message.setMsg("更新用户信息成功");
            } else {
                message.setSuccess(false);
                message.setMsg("更新用户信息失败: 不存在该用户");
            }
            message.setMsg("修改成功");
        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("修改用户信息失败: 出现异常");
            System.out.println(message);
            return message;
        }
        //同步修改缓存中数据
        User.cacheList.removeIf(user -> user.getId()==userId);
        User.cacheList.add(modifyUser);

        System.out.println(message);
        return message;

    }

    /**
     * 上传用户头像,返回图片URL
     * */
    @RequestMapping(method = RequestMethod.POST ,value = "/upload")
    @ResponseBody
    @CrossOrigin
    public Message handleFileUpload(@RequestParam("file") MultipartFile file) {
        System.out.println("\nPOST /upload\n");
        Message<String> message = new Message<>();
        if(file == null || file.isEmpty()){
            message.setSuccess(false);
            message.setMsg("上传失败,文件为空！" );
            System.out.println(message);
            return message;
        }
        String originName = file.getOriginalFilename();
        System.out.println("--------Origin-------");
        System.out.println("OriginName: " + originName);
        System.out.println("Name: " + file.getName());
        System.out.println("Type: " + file.getContentType());
        System.out.println("--------Origin-------");
            try {
                //获取根目录
                File path = new File(ResourceUtils.getURL("classpath:").getPath());
                if(!path.exists()) {
                    path = new File("");
                }
                File upload = new File(path.getAbsolutePath(),"static/images/upload/");
                if(!upload.exists()) {
                    upload.mkdirs();
                }
//在开发测试模式时，得到的地址为：{项目根目录}/target/static/images/upload/
//在打包成jar正式发布时，得到的地址为：{发布jar包目录}/static/images/upload/
                System.out.println("--------Upload-------");
                System.out.println("RootPath: " + path.getAbsolutePath());
                System.out.println("UploadPath: " + upload.getAbsolutePath());
                System.out.println("--------Upload-------");
                String fileName =  Util.getRandomFileName() + originName.substring(originName.lastIndexOf("."));
                String filePath = upload.getAbsolutePath() + "/"+ fileName;
                BufferedOutputStream out = new BufferedOutputStream(
                        new FileOutputStream(new File(filePath)));
                message.setSuccess(true);
                message.setMsg("上传成功");
                message.setData("http://api.timoney.xyz/static/images/upload/" + fileName);
                out.write(file.getBytes());
                out.flush();
                out.close();
            }catch (IOException e) {
                e.printStackTrace();
                message.setSuccess(false);
                message.setMsg("上传失败: 出现异常");
                System.out.println(message);
                return message;
            }
            System.out.println(message);
            return message;

    }

    @RequestMapping(method = RequestMethod.GET,value = "/report")
    @ResponseBody
    @CrossOrigin
    public File testDownload() {
        //获取跟目录
        String fileName = "C:\\Users\\Janking\\Desktop\\嵌入式操作系统\\嵌入式操作系统作业模板_Linux内核.doc";
        return new File(fileName);
    }

    /**
     * 删除指定用户
     * 通过id查找
     * */
    @RequestMapping(method = RequestMethod.DELETE,value = "/user")
    @CrossOrigin
    public Message<String> deleteUser(@CookieValue("user") String userCookieKey){
        System.out.println("\nDELETE /user/\n");
        Message<String> message = new Message<>();
        int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            int result;
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            result = userMapper.deleteUser(userId);
            if (result > 0) {
                message.setSuccess(true);
                message.setMsg("删除成功");
            } else {
                message.setSuccess(false);
                message.setMsg("不存在该用户");
            }
            sqlSession.commit();
        } catch (Exception e) {
            e.printStackTrace();
            message.setMsg("删除失败: 出现异常");
            System.out.println(message);
            return message;
        }
        //同步删除缓存中数据
        User.cacheList.removeIf(user -> user.getId()==userId);
        System.out.println(message);
        return message;
    }


}
