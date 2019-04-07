package cn.janking.swsad.Mapper;

import cn.janking.swsad.bean.Questionnaire;

import java.util.List;

public interface QuestionnaireMapper {
    /*初始化表格*/
    void quesTableInit();

    /*获取问卷数量*/
    int getCount();

    /*添加一个新的问卷*/
    boolean insert(Questionnaire questionnaire);

    /*返回所有问卷*/
    List <Questionnaire> getQuestionnaires();

    /*获取指定IDs问卷*/
    Questionnaire getByIds(int ques_id, int publish_id, int repondent_id);

    /*填写问卷*/
    boolean FillIn(Questionnaire questionnaire, String results);

    /*删除所有问卷*/
    boolean DeleteAllQuestionnaires();

    /*删除指定IDs问卷*/
    boolean DeleteQuestionnaire(int ques_id, int publish_id, int repondent_id);
}
