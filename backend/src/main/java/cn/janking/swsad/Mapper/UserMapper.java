package cn.janking.swsad.mapper;


import cn.janking.swsad.bean.User;

import java.util.List;

public interface UserMapper {
    public User getById(int id);
    public boolean insert(User user);
    public List<User> getUsers();
    public boolean updateUser(User user);
    public boolean deleteUser(int id);
    public boolean deleteAllUsers();
}