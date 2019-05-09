package cn.janking.swsad.Mapper;
import java.util.List;
import cn.janking.swsad.bean.questionnaire;
public interface QuestionnaireMapper {
    /*添加一个问卷*/
    boolean insert(questionnaire ques);
    /*获取所有问卷*/
    List<questionnaire> getAllQues();

    /*获取问卷详情*/
    questionnaire getQuesByID(int quesID);
    /*获取问卷内容*/
    String getQuesCont(int quesID);
    int getCount();
}
