package xyz.timoney.swsad.mapper;
import java.util.List;
import xyz.timoney.swsad.bean.questionnaire;
import xyz.timoney.swsad.bean.infos;
public interface QuestionnaireMapper {
    /*初始化表*/
    void questionnaireTableInit();
    /*添加一个问卷*/
    boolean insert(questionnaire ques);
    /*获取所有正在进行问卷*/
    List<questionnaire> getAllQues();

    /*获取问卷详情*/
    questionnaire getQuesByID(int quesID);

    infos getInfo(int quesID);
    /*获取问卷内容*/
    String getQuesCont(int quesID);

    /*获取用户发布的所有问卷*/
    //List<questionnaire> getAllPublished(int userId);
    /*初始化用户填写问卷列表*/
    List<questionnaire> getAllFilled(int userId);
    /*初始化用户收藏问卷列表*/
    List<questionnaire> getAllCollected(int userId);

    /*Janking: 获取用户发布的所有问卷*/
    List<questionnaire> getAllPublished(int userId);

    int getCount();
}
