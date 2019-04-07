package cn.janking.swsad.controller;

import cn.janking.swsad.bean.User;
import cn.janking.swsad.Mapper.UserMapper;
import cn.janking.swsad.singleton.SingletonMybatis;
import com.fasterxml.jackson.core.JsonFactory;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.json.JsonSimpleJsonParser;
import org.springframework.web.bind.annotation.*;

import javax.jws.soap.SOAPBinding;
import java.util.List;

@RestController
@EnableAutoConfiguration
public class Controller {

    private static SqlSessionFactory sqlSessionFactory;
    static {
        sqlSessionFactory =  SingletonMybatis.getSqlSessionFactory();
        /*用户数量*/
        User.initCount(sqlSessionFactory.openSession(true).getMapper(UserMapper.class).getCount());
    }



    //如果方法上的RequestMapping没有value，则此方法默认被父路径调用
    //默认回调
    @RequestMapping
    private String index(){
        return "API也会404哦!";
    }
    @RequestMapping("/hello")
    private String hello(){
        return "Hello World!";
    }
    //这里体现了restful风格的请求，按照请求的类型，来进行增删查改。
    //设计restful api（其实也就是URL），不要有冗余，例如不要写成getUsers，URL中
    //最好不要有动词。
    /*初始化表*/
    @RequestMapping(method = RequestMethod.GET,value = "/admin")
    public boolean usersTableInit(){
        //获取一个连接,自动提交
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        try {
            //得到映射器
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            //调用接口中的方法去执行xml文件中的SQL语句
            userMapper.userTableInit();
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
        finally {
            //最后记得关闭连接
            sqlSession.close();
        }
        return true;
    }
    /*获取所有用户*/
    @RequestMapping(method = RequestMethod.GET,value = "/users")
    public List<User> getUsers(){
        List<User> listUsers;
        //获取一个连接
        SqlSession sqlSession = sqlSessionFactory.openSession();
        try {
            //得到映射器
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            //调用接口中的方法去执行xml文件中的SQL语句
            listUsers = userMapper.getUsers();
            //要提交后才会生效
            sqlSession.commit();
        }finally {
            //最后记得关闭连接
            sqlSession.close();
        }

        return listUsers;
    }
    /*注册：插入用户数据
     * 成功返回true
     * 用户名存在返回false*/
    @RequestMapping(method = RequestMethod.POST,value = "/register")
    public boolean register(@RequestBody User user){
        SqlSession sqlSession = sqlSessionFactory.openSession();
        try {
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            user.modifyUser();
            userMapper.insert(user);
            sqlSession.commit();
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }finally {
            sqlSession.close();
        }
        return true;
    }
    /*登录：判断用户名和密码是否一致
     * 一致返回当前用户的信息
     * 不一致返回null*/
    @RequestMapping(method = RequestMethod.POST,value = "/user")
    public User login(@RequestBody User loginUser){
        User user = null;
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //判断是手机还是邮箱
        System.out.println(loginUser.getPhone() + loginUser.getEmail());
        if(loginUser.getPhone() != null && !loginUser.getPhone().isEmpty()){
            try {
                UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
                user = userMapper.getByPhone(loginUser.getPhone());
                sqlSession.commit();
            }catch (Exception e){
                e.printStackTrace();
            }finally {
                sqlSession.close();
            }
        }
        if(loginUser.getEmail() != null && !loginUser.getEmail().isEmpty()){
            try {
                UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
                user = userMapper.getByEmail(loginUser.getEmail());
                sqlSession.commit();
            }catch (Exception e){
                e.printStackTrace();
            }finally {
                sqlSession.close();
            }
        }
        //判断密码是否正确
        if(user!=null && user.getPassword().equals(loginUser.getPassword()))
            return user;
        return null;
    }
    /*更新用户数据*/
    @RequestMapping(method = RequestMethod.PUT,value = "/user")
    public boolean updateUser(@RequestBody User user){
        SqlSession sqlSession = sqlSessionFactory.openSession();
        boolean result;
        try {
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            result = userMapper.updateUser(user);
            sqlSession.commit();
        }finally {
            sqlSession.close();
        }
        return result;
    }

    /*删除指定用户*/
    @RequestMapping(method = RequestMethod.DELETE,value = "/user/{userId}")
    public boolean deleteUser(@PathVariable int userId){
        SqlSession sqlSession = sqlSessionFactory.openSession();
        boolean result;
        try {
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            result = (userMapper.deleteUser(userId) > 0);
            System.out.println(result);
            sqlSession.commit();
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
        finally {
            sqlSession.close();
        }
        return result;
    }


}
