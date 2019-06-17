package xyz.timoney.swsad.mapper;

import xyz.timoney.swsad.bean.MoneyRecord;

/**
 * 充值提现记录
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
   boolean insertRecord(MoneyRecord moneyRecord);
}
