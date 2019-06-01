package xyz.timoney.swsad.mapper;
import java.util.List;

import xyz.timoney.swsad.bean.questionnaire.*;

public interface QuestionnaireMapper {

    /*提交一个问卷结果*/
    boolean commitResults(QuesResult_temp quesResult_temp);

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

    /*根据ID获取标题*/
    String getTitleByID(int quesID);

    /*根据ID获取填空题*/
    List<Ques1> getQues1s(int quesID);

    /*根据ID获取temp选择题*/
    List<Ques2_temp> getQues2s(int quesID);

    /*计算问卷库内的行数*/
    int CountQuestion();


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
     * 获取用户发布的所有问卷ID
     * */
    List<Integer> getAllPublishedId(int userId);

    /**
     * 问卷填写人数加1
     * */
    int addOneFill();

    /**
     * 问卷填写人数建1
     * */
    int cancelOneFill();

    /**
     * 通过Id集获取所有的问卷
     * 略难，还没做出来
     *
     * @param idList 问卷id的列表
     * @return 问卷对象的列表
     * */
    List<Questionnaire> getAllQuesByIdListDateDesc(List<Integer> idList);

    int getCount();
}
