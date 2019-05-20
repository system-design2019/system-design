package xyz.timoney.swsad.mapper;
import xyz.timoney.swsad.bean.User;
import xyz.timoney.swsad.bean.questionnaire;

import java.util.List;

public interface UserMapper {
    /*判断表是否存在*/
    int existTable(String tableName);
    /*新建表格*/
     void userTableInit();
     /*删除表格*/
     void userTableDrop();

    /*获取用户数量*/
     int getCount();
    /*添加一个用户*/
     int insert(User user) throws com.mysql.jdbc.exceptions.jdbc4.MySQLIntegrityConstraintViolationException;
    /*查找特定id的用户*/
     User getById(int id);
    /*查找特定手机号的用户*/
     User getByPhone(String phone);
    /*查找特定手机号的用户*/
     User getByEmail(String email);
    /*通过Email或手机号获取ID号码*/
     int getId(String phoneOrEmail);

    /*更新用户信息*/
     int updateUser(User user);

    /*返回所有用户*/
    List<User> getUsers();
    /*删除指定id的用户*/
     int deleteUser(int id);
    /*删除所有用户！*/
     boolean deleteAllUsers();

}