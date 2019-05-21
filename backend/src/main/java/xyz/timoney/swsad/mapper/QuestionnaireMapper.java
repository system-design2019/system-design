package xyz.timoney.swsad.mapper;
import java.util.List;

import xyz.timoney.swsad.bean.questionnaire.Ques1;
import xyz.timoney.swsad.bean.questionnaire.Ques2_temp;
import xyz.timoney.swsad.bean.questionnaire.Infos;
import xyz.timoney.swsad.bean.questionnaire.Questionnaire;
public interface QuestionnaireMapper {
    /*初始化表*/
    void questionnaireTableInit();
    /**
     * 添加一个问卷
     * */
    boolean insert(Questionnaire ques);
    /**
     * 获取所有正在进行问卷
     * */

    /*插入填空题*/
    boolean insertTian(Ques1 ques1);
    /*插入选择题*/
    boolean insertXuan(Ques2_temp ques2_temp);

    /*获取所有正在进行问卷*/
    List<Questionnaire> getAllQues();

    /**
     * 获取问卷详情
     * */
    Questionnaire getQuesByID(int quesID);

    Infos getInfo(int quesID);
    /**
     * 获取问卷内容
     * */
    String getQuesCont(int quesID);

    /**
     * 获取用户发布的所有问卷
     * */
    List<Questionnaire> getAllPublished(int userId);

    /**
     * 通过Id集获取所有的问卷
     *
     * @param idList 问卷id的列表
     * @return 问卷对象的列表
     * */
    List<Questionnaire> getAllQuesByIdListDateDesc(List<Integer> idList);

    int getCount();
}
