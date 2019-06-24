package xyz.timoney.swsad.mapper;

import xyz.timoney.swsad.bean.MoneyRecord;

import java.util.List;

/**
 * 账户余额记录
 */
public interface MoneyMapper {
    /**
     * 新建表格
     * */
    void moneyTableInit();

    /**
     * 删除
     * */
    void moneyTableDrop();

    /***
     * 添加记录
     * @param moneyRecord
     * @return
     */
   int insertRecord(MoneyRecord moneyRecord);

    /**
     * 获取用户的所有交易记录
     * @param userId
     * @return
     */
    List<MoneyRecord> getAllRecordById(int userId);

    /**
     * 设置交易状态
     */
   boolean setStatus(int moneyId, boolean status);

    /**
     * @param id 删除交易记录
     */
   void deleteRecord(int id);
}
