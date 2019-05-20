package xyz.timoney.swsad.mapper;

import xyz.timoney.swsad.bean.QuesCollectUser;

import java.util.List;

public interface QuesCollectUserMapper {
    /*新建表格*/
    void quesCollectUserTableInit();
    /*删除表格*/
    void quesCollectUserTableDrop();
    /*添加收藏*/
    int insert(QuesCollectUser quesCollectUser);
    /*删除收藏者*/
    int delete(QuesCollectUser quesCollectUser);
    /*获取指定用户收藏的所有问卷id*/
    List<Integer> getAllCollected(int userId);
    /*获取指定问卷所有的收藏者id*/
    List<Integer> getAlsCollector(int quesId);
}
