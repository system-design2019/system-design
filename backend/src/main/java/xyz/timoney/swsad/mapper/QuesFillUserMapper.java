package xyz.timoney.swsad.mapper;

import xyz.timoney.swsad.bean.QuesFillUser;

import java.util.List;

public interface QuesFillUserMapper {
    /*新建表格*/
    void quesFillUserTableInit();
    /*删除表格*/
    void quesFillUserTableDrop();
    /*添加参与者*/
    int insert(QuesFillUser quesFillUser);
    /*删除参与者*/
    int delete(QuesFillUser quesFillUser);
    /*获取指定用户填写的所有问卷id*/
    List<Integer> getAllFilled(int userId);
    /*获取指定问卷所有的填写者id*/
    List<Integer> getAllFiller(int quesId);
}
