package xyz.timoney.swsad.mapper;
import java.util.List;
import xyz.timoney.swsad.bean.questionnaire;
public interface QuestionnaireMapper {
    /*初始化表*/
    void questionnaireTableInit();
    /*添加一个问卷*/
    boolean insert(questionnaire ques);
    /*获取所有问卷*/
    List<questionnaire> getAllQues();

    /*获取问卷详情*/
    questionnaire getQuesByID(int quesID);
    /*获取问卷内容*/
    String getQuesCont(int quesID);

    /*Janking: 获取用户发布的所有问卷*/
    List<questionnaire> getAllPublished(int userId);

    int getCount();
}
