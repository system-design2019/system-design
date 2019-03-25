package cn.janking.swsad.controller;

import cn.janking.swsad.bean.User;
import cn.janking.swsad.mapper.UserMapper;
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
    //这里用的是路径变量，就是{}括起来的，会当做变量读进来
    @RequestMapping(method = RequestMethod.GET,value = "/user/{userId}")
    public User getUser(@PathVariable int userId){
        User user;
        SqlSession sqlSession = sqlSessionFactory.openSession();
        try {
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            user = userMapper.getById(userId);
            sqlSession.commit();
        }finally {
            sqlSession.close();
        }
        return user;
    }
    //RequestBody这个注解可以接收json数据
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
    @RequestMapping(method = RequestMethod.POST,value = "/user")
    public boolean addUser(@RequestBody User user){
        SqlSession sqlSession = sqlSessionFactory.openSession();
        try {
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            userMapper.insert(user);
            sqlSession.commit();
        }finally {
            sqlSession.close();
        }
        return true;
    }

    @RequestMapping(method = RequestMethod.DELETE,value = "/user/{userId}")
    public boolean deleteUser(@PathVariable int userId){
        SqlSession sqlSession = sqlSessionFactory.openSession();
        boolean result;
        try {
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            result = userMapper.deleteUser(userId);
            sqlSession.commit();
        }finally {
            sqlSession.close();
        }
        return result;
    }


}
