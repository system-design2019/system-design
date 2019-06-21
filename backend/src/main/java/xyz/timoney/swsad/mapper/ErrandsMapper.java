package xyz.timoney.swsad.mapper;

import org.apache.ibatis.annotations.Param;
import xyz.timoney.swsad.bean.errands.Errands;
import xyz.timoney.swsad.bean.errands.Participant;


import java.sql.Timestamp;
import java.util.List;

public interface ErrandsMapper {

    /*添加一个跑腿*/
    boolean insert(Errands errand);

    /*计算跑腿库内的行数*/
    int CountErrands();

    /*查询跑腿号最大的ID*/
    int queryMaxID();

    /*获取所有正在进行跑腿*/
    List<Errands> getAllErra(@Param("current") Timestamp current);

    /*根据ID关闭跑腿*/
    void closeErraByID(@Param("errandsID")int errandsID, @Param("timeNow")Timestamp timeNow);

    /*根据ID删除跑腿库 跑腿*/
    void deleteErraByID(@Param("errandsID")int errandsID);

    /*根据ID删除参与者库 跑腿记录*/
    void deletePanByID(@Param("errandsID")int errandsID);

    /*根据两个id记录参与者*/
    void participate(@Param("errandsID")int errandsID,@Param("userID")int userID,@Param("partTime")Timestamp partTime);

    /*根据ID获取跑腿*/
    Errands getErraByID(@Param("errandsID")int errandsID);

    /*确认完成跑腿*/
    void setStatus(@Param("errandsID")int errandsID);

    /*参与跑腿，人数加1*/
    void addPart(@Param("errandsID")int errandsID);

    /*根据ID获得参与者*/
    List<Participant> getPartsByID(@Param("errandsID")int errandsID);

    /*根据userID获取所有参与跑腿*/
    List<Integer> allPartErra(@Param("userID")int userID);
}
