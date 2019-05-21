package xyz.timoney.swsad.mapper;

import xyz.timoney.swsad.bean.quesUser.QuesFillUser;

import java.util.List;

public interface QuesFillUserMapper {
    /*新建表格*/
    void quesFillUserTableInit();
    /*删除表格*/
    void quesFillUserTableDrop();
    /*添加填写者*/
    int insert(QuesFillUser quesFillUser);
    /*删除填写者*/
    int delete(QuesFillUser quesFillUser);
    /*获取指定用户填写的所有问卷id*/
    List<Integer> getAllFilled(int userId);
    /*获取指定问卷所有的填写者id*/
    List<Integer> getAllFiller(int quesId);
}
