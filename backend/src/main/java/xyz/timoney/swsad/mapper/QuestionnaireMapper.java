package xyz.timoney.swsad.mapper;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import xyz.timoney.swsad.bean.Ques1;
import xyz.timoney.swsad.bean.Ques2_temp;
import xyz.timoney.swsad.bean.questionnaire;
import xyz.timoney.swsad.bean.infos;
public interface QuestionnaireMapper {
    /*初始化表*/
    void questionnaireTableInit();
    /*添加一个问卷*/
    boolean insert(questionnaire ques);

    /*插入填空题*/
    boolean insertTian(Ques1 ques1);
    /*插入选择题*/
    boolean insertXuan(Ques2_temp ques2_temp);

    /*获取所有正在进行问卷*/
    List<questionnaire> getAllQues();

    /*获取问卷详情*/
    questionnaire getQuesByID(int quesID);

    infos getInfo(int quesID);
    /*获取问卷内容*/
    String getQuesCont(int quesID);

    /*获取用户发布的所有问卷*/
    List<questionnaire> getAllPublished(int userId);

    /*通过Id集获取所有的问卷*/
    List<questionnaire> getAllQuesByIdListDateDesc(List<Integer> idList);

    int getCount();
}
