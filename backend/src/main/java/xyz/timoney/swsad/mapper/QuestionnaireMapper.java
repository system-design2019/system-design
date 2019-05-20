package xyz.timoney.swsad.mapper;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import xyz.timoney.swsad.bean.questionnaire;
import xyz.timoney.swsad.bean.infos;
public interface QuestionnaireMapper {
    /*初始化表*/
    void questionnaireTableInit();
    /**
     * 添加一个问卷
     * */
    boolean insert(questionnaire ques);
    /**
     * 获取所有正在进行问卷
     * */
    List<questionnaire> getAllQues();

    /**
     * 获取问卷详情
     * */
    questionnaire getQuesByID(int quesID);

    infos getInfo(int quesID);
    /**
     * 获取问卷内容
     * */
    String getQuesCont(int quesID);

    /**
     * 获取用户发布的所有问卷
     * */
    List<questionnaire> getAllPublished(int userId);

    /**
     * 通过Id集获取所有的问卷
     *
     * @param idList 问卷id的列表
     * @return 问卷对象的列表
     * */
    List<questionnaire> getAllQuesByIdListDateDesc(List<Integer> idList);

    int getCount();
}
