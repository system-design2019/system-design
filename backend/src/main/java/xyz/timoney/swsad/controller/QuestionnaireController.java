package xyz.timoney.swsad.controller;

import org.apache.ibatis.annotations.Param;
import xyz.timoney.swsad.bean.*;
import xyz.timoney.swsad.mapper.QuesCollectUserMapper;
import xyz.timoney.swsad.mapper.QuesFillUserMapper;
import xyz.timoney.swsad.mapper.QuestionnaireMapper;
import xyz.timoney.swsad.singleton.SingletonMybatis;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@EnableAutoConfiguration
public class QuestionnaireController {

    private static SqlSessionFactory sqlSessionFactory;
    static {
        sqlSessionFactory =  SingletonMybatis.getSqlSessionFactory();
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        try {
            //得到映射器
            QuestionnaireMapper questionnaireMapper = sqlSession.getMapper(QuestionnaireMapper.class);

             //初始化用户填写问卷表格
            QuesFillUserMapper quesFillUserMapper = sqlSession.getMapper(QuesFillUserMapper.class);
            quesFillUserMapper.quesFillUserTableInit();

             //初始化用户收藏问卷表格
            QuesCollectUserMapper quesCollectUserMapper= sqlSession.getMapper(QuesCollectUserMapper.class);
            quesCollectUserMapper.quesCollectUserTableInit();
            //调用接口中的方法去执行xml文件中的SQL语句
            //初始化问卷表
            //questionnaireMapper.questionnaireTableInit();
            /*用户数量*/
            /*问卷数量*/
            int count = questionnaireMapper.getCount();
            //questionnaire.initCount(count);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    /*获取问卷详情*/
    @RequestMapping(method = RequestMethod.GET,value = "/getQues/{quesID}")
    @CrossOrigin
    public Message<questionnaire> getQueseByID(@PathVariable int quesID){
        Message<questionnaire> message = new Message<>();
        questionnaire theQues;
        //获取一个连接
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            //得到映射器
            QuestionnaireMapper quesMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            //调用接口中的方法去执行xml文件中的SQL语句
            theQues = quesMapper.getQuesByID(quesID);
            infos temp=quesMapper.getInfo(theQues.getQuesID());
            theQues.setInfos(temp);

            message.setData(theQues);
            message.setSuccess(true);
            message.setMsg("获取成功");
            //要提交后才会生效
            sqlSession.commit();
        } catch (Exception e) {
            message.setData(null);
            message.setSuccess(false);
            message.setMsg("获取失败:" + e.getMessage());
        }
        //最后记得关闭连接
        System.out.println(message);
        return message;
    }


    /*获取问卷内容，即题目等*/
    @RequestMapping(method = RequestMethod.GET,value = "/getQuesCont/{quesID}")
    @CrossOrigin
    public Message<String> getQueseCont(@PathVariable int quesID){
        Message<String> message = new Message<>();
        String theQuesCont;
        //获取一个连接
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            //得到映射器
            QuestionnaireMapper quesMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            //调用接口中的方法去执行xml文件中的SQL语句
            theQuesCont = quesMapper.getQuesCont(quesID);
            message.setData(theQuesCont);
            message.setSuccess(true);
            message.setMsg("获取成功");
            //要提交后才会生效
            sqlSession.commit();
        } catch (Exception e) {
            message.setData(null);
            message.setSuccess(false);
            message.setMsg("获取失败:" + e.getMessage());
        }
        //最后记得关闭连接

        return message;
    }

    /*获取所有正在进行的问卷*/
    @RequestMapping(method = RequestMethod.GET,value = "/allques")
    @CrossOrigin
    public Message<List<questionnaire>> getQueses(){
        Message<List<questionnaire>> message = new Message<>();
        List<questionnaire> listQues;
        //获取一个连接
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            //得到映射器
            QuestionnaireMapper quesMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            //调用接口中的方法去执行xml文件中的SQL语句
            listQues = quesMapper.getAllQues();
            for(int i=0; i<listQues.size();i++)
            {
                infos temp=quesMapper.getInfo(listQues.get(i).getQuesID());
                listQues.get(i).setInfos(temp);
            }
            message.setData(listQues);
            message.setSuccess(true);
            message.setMsg("获取成功");
            //要提交后才会生效
            sqlSession.commit();
        } catch (Exception e) {
            message.setData(null);
            message.setSuccess(false);
            message.setMsg("获取失败:" + e.getMessage());
        }
        //最后记得关闭连接

        return message;
    }

    /*插入一个问卷*/
    /*并且更新缓存中的用户创建表的List*/
    @RequestMapping(method = RequestMethod.POST,value = "/createques")
    @CrossOrigin
    public Message<String> createQues(@RequestBody questionnaire ques)
    {
        /*
        @TODO  验证用户身份
        */
        Message<String> message = new Message<>();
        System.out.println(ques);
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            QuestionnaireMapper quesMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            quesMapper.insert(ques);
            message.setSuccess(true);
            message.setMsg("创建成功");
            sqlSession.commit();
        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("创建失败:" + e.getMessage());
            return message;
        }
        /*
        @TODO  更新缓存
        */
        return message;
    }


    /**
     * 收藏某个问卷
     * */
    @RequestMapping(method = RequestMethod.PUT,value = "/questionnaires/collect")
    @CrossOrigin
    public Message<String> questionnaireCollect(@CookieValue("user") String userCookieKey, @Param("id") int quesId)
    {
        /*
        验证用户身份
        */
        System.out.println("\nPUT /questionnaires/collect" +  quesId + "\n");
        Message<String> message = new Message<>();
        int userId = UserState.verifyCookie(userCookieKey, message);
        if(!message.isSuccess()){
            return message;
        }
        questionnaire questionnaire;
        //修改数据库
        try (SqlSession sqlSession = sqlSessionFactory.openSession(true)) {
            //得到映射器
            QuesCollectUserMapper quesCollectUserMapper= sqlSession.getMapper(QuesCollectUserMapper.class);
            //调用接口中的方法去执行xml文件中的SQL语句
            quesCollectUserMapper.insert(new QuesCollectUser(quesId, userId));

            //获得问卷对象
            QuestionnaireMapper questionnaireMapper = sqlSession.getMapper(QuestionnaireMapper.class);
            questionnaire = questionnaireMapper.getQuesByID(quesId);
        } catch (Exception e) {
            e.printStackTrace();
            message.setSuccess(false);
            message.setMsg("收藏问卷失败: 出现异常");
            System.out.println(message);
            return message;
        }
        //同步通知发送到缓存中的用户
        for(User u : User.cacheList){
            if(u.getId() == userId){
                u.getCollected().add(questionnaire);
            }
        }
        message.setSuccess(true);
        message.setMsg("收藏问卷成功");
        System.out.println(message);
        return message;
    }


}
